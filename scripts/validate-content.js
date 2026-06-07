import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIRS = [
  "src/content/games",
  "src/content/movies",
  "src/content/series",
  "src/content/books",
  "src/content/music",
];

let errors = 0;

function validateFile(filePath) {
  const raw =
    fs.readFileSync(
      filePath,
      "utf8"
    );

  const { data } =
    matter(raw);

  const title =
    data.title;

  if (!title) {
    console.error(
      `❌ Missing title: ${filePath}`
    );
    errors++;
  }

  if (
    data.personal_rating !==
      undefined &&
    (
      data.personal_rating < 0 ||
      data.personal_rating > 10
    )
  ) {
    console.error(
      `❌ Invalid rating: ${title}`
    );
    errors++;
  }

  if (data.cover) {
    const coverPath =
      path.join(
        "public/covers",
        data.cover
      );

    if (
      !fs.existsSync(
        coverPath
      )
    ) {
      console.error(
        `❌ Missing cover: ${coverPath}`
      );
      errors++;
    }

    if (
      !data.cover.endsWith(
        ".webp"
      )
    ) {
      console.warn(
        `⚠️ Not webp: ${title}`
      );
    }
  }

  if (
    data.cover_type &&
    ![
      "poster",
      "square",
    ].includes(
      data.cover_type
    )
  ) {
    console.error(
      `❌ Invalid cover_type: ${title}`
    );
    errors++;
  }
}

function scan(dir) {
  const files =
    fs.readdirSync(dir);

  for (const file of files) {
    if (
      !file.endsWith(".md")
    )
      continue;

    validateFile(
      path.join(dir, file)
    );
  }
}

for (const dir of CONTENT_DIRS) {
  scan(dir);
}

if (errors > 0) {
  console.error(
    `\n${errors} validation errors found`
  );

  process.exit(1);
}

console.log(
  "✅ Content validation passed"
);