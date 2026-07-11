import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://abbas-talebi.github.io",
  base: "/baqishelf-lab/",
  integrations: [react(), sitemap()],
  
  // این بخش فقط روی سیستم شما کار می‌کند و فایل‌ها را می‌سازد
  vite: {
    plugins: [
      {
        name: "local-save-api",
        configureServer(server) {
          server.middlewares.use("/baqishelf-lab/api/save", async (req, res) => {
            if (req.method === "POST") {
              let body = "";
              req.on("data", chunk => { body += chunk.toString(); });
              req.on("end", async () => {
                try {
                  const data = JSON.parse(body);
                  const { type, item, personalData } = data;

                  // 1. ساخت نام فایل (Slug)
                  const safeTitle = item.title.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '-').replace(/-+/g, '-').toLowerCase();
                  const slug = `${safeTitle}-${item.year || 'unknown'}`;
                  
                  // 2. مسیرها
                  const typeFolder = `${type}s`; // movies, games, etc.
                  const coverFileName = `${slug}.webp`;
                  const coverRelPath = `${typeFolder}/${coverFileName}`;
                  const coverAbsPath = path.join(process.cwd(), "public", "covers", typeFolder, coverFileName);
                  const mdAbsPath = path.join(process.cwd(), "src", "content", typeFolder, `${slug}.md`);

                  // 3. دانلود و بهینه‌سازی عکس (اگر عکسی وجود داشت)
                  if (item.cover) {
                    const imgRes = await fetch(item.cover);
                    const arrayBuffer = await imgRes.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    
                    const isSquare = type === 'music';
                    await sharp(buffer)
                      .resize(isSquare ? 600 : 400, isSquare ? 600 : 600, { fit: "cover" })
                      .webp({ quality: 85 })
                      .toFile(coverAbsPath);
                  }

                  // 4. ساخت محتوای Markdown بر اساس نوع مدیوم
                  const dateField = type === 'movie' || type === 'series' ? 'date_watched' : type === 'music' ? 'date_listened' : 'date_finished';
                  const today = new Date().toISOString().split('T')[0];
                  
                  let mdContent = `---\n`;
                  mdContent += `title: "${item.title}"\n`;
                  mdContent += `personal_rating: ${personalData.rating || 0}\n`;
                  mdContent += `year: ${item.year || new Date().getFullYear()}\n`;
                  mdContent += `status: "${personalData.status}"\n\n`;
                  
                  // فیلدهای اختصاصی هر مدیوم
                  if (type === 'movie') {
                    if (personalData.director) mdContent += `director: "${personalData.director}"\n`;
                    if (personalData.runtime) mdContent += `runtime: ${personalData.runtime}\n`;
                  } else if (type === 'series') {
                    if (personalData.seasons) mdContent += `seasons: ${personalData.seasons}\n`;
                    if (personalData.episodes) mdContent += `episodes: ${personalData.episodes}\n`;
                  } else if (type === 'game') {
                    if (personalData.platforms) mdContent += `platforms: [${personalData.platforms.split(',').map(p=>`"${p.trim()}"`).join(',')}]\n`;
                    if (personalData.developer) mdContent += `developer: "${personalData.developer}"\n`;
                  } else if (type === 'book') {
                    if (personalData.author) mdContent += `author: "${personalData.author}"\n`;
                    if (personalData.pages) mdContent += `pages: ${personalData.pages}\n`;
                  } else if (type === 'music') {
                    if (personalData.artist) mdContent += `artist: "${personalData.artist}"\n`;
                  }

                  mdContent += `\n${dateField}: ${today}\n`;
                  
                  // ژانرها و تگ‌ها
                  if (item.genres && item.genres.length > 0) {
                    mdContent += `genres:\n${item.genres.map(g => `  - ${g}`).join('\n')}\n`;
                  }
                  if (personalData.tags) {
                    const tags = personalData.tags.split(',').map(t => t.trim()).filter(t => t);
                    if (tags.length > 0) mdContent += `tags:\n${tags.map(t => `  - ${t}`).join('\n')}\n`;
                  }

                  mdContent += `\ncover: "${item.cover ? coverRelPath : ''}"\n`;
                  mdContent += `cover_type: "${type === 'music' ? 'square' : 'poster'}"\n`;
                  if (personalData.summary) mdContent += `summary: "${personalData.summary}"\n`;
                  mdContent += `---\n`;

                  // 5. ذخیره فایل md
                  fs.writeFileSync(mdAbsPath, mdContent, 'utf8');

                  res.setHeader("Content-Type", "application/json");
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, message: "فایل و عکس با موفقیت ذخیره شدند!" }));
                } catch (error) {
                  res.setHeader("Content-Type", "application/json");
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: error.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ]
  }
});