import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import matter from "gray-matter";

const CONTENT_DIRS = [
  "src/content/games",
  "src/content/movies",
  "src/content/series",
  "src/content/books",
  "src/content/music",
];

// تابع هوشمند برای دانلود عکس (با قابلیت دور زدن فیلترینگ)
async function fetchImageWithFallback(url) {
  try {
    // ۱. تلاش برای دانلود مستقیم
    const response = await fetch(url);
    if (!response.ok) throw new Error("Direct fetch failed");
    return await response.arrayBuffer();
  } catch (error) {
    // ۲. اگر فیلتر بود، از سرور واسط (Image Proxy) استفاده می‌کند
    console.log(`   ⚠️ Direct connection was blocked. Using proxy server...`);
    // حذف https:// از ابتدای آدرس برای سرور واسط
    const cleanUrl = url.replace(/^https?:\/\//, '');
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}`;
    
    const proxyResponse = await fetch(proxyUrl);
    if (!proxyResponse.ok) throw new Error("Proxy server also failed to download the image.");
    return await proxyResponse.arrayBuffer();
  }
}

async function processImages() {
  console.log("🔍 Searching for new images...");
  let processedCount = 0;

  for (const dir of CONTENT_DIRS) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(dir, file);
      const rawContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(rawContent);

      // اگر فیلد source_image وجود داشت یعنی عکس باید دانلود شود
      if (data.source_image) {
        console.log(`⏳ Downloading image for: ${data.title}`);
        try {
          const imgUrl = data.source_image;
          const isSquare = data.cover_type === 'square';
          
          // اصلاح خودکار نام پوشه musics به music (در صورت وجود اشتباه تایپی)
          let coverRelPath = data.cover;
          if (coverRelPath.startsWith('musics/')) {
            coverRelPath = coverRelPath.replace('musics/', 'music/');
            data.cover = coverRelPath; // آپدیت کردن مسیر در فایل md
          }

          const coverAbsPath = path.join(process.cwd(), "public", "covers", coverRelPath);
          
          // ساخت پوشه اگر وجود نداشت
          const coverDir = path.dirname(coverAbsPath);
          if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });

          // دانلود با استفاده از تابع هوشمند
          const arrayBuffer = await fetchImageWithFallback(imgUrl);
          const buffer = Buffer.from(arrayBuffer);

          // تغییر سایز و تبدیل به webp
          await sharp(buffer)
            .resize(
  isSquare ? 450 : 300,
  isSquare ? 450 : 450,
  { fit: "cover" }
)
            .webp({ quality: 80, effort: 6 })
            .toFile(coverAbsPath);

          console.log(`✅ Image saved: ${coverRelPath}`);

          // پاک کردن لینک اصلی از فایل و ذخیره مجدد
          delete data.source_image;
          const newMdContent = matter.stringify(content, data);
          fs.writeFileSync(filePath, newMdContent, "utf8");
          
          processedCount++;
        } catch (error) {
          console.error(`❌ Error downloading image ${data.title}:`, error.message);
        }
      }
    }
  }

  if (processedCount === 0) {
    console.log("✨ No new images found for processing.");
  } else {
    console.log(`🎉 Operation completed! ${processedCount} images processed and saved.`);
  }
}

processImages();