import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const COVER_ROOT =
  "./public/covers";

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
];

const dimensions = {
  poster: {
    width: 400,
    height: 600,
  },

  square: {
    width: 600,
    height: 600,
  },
};

function getCoverType(folder) {
  if (folder === "music") {
    return "square";
  }

  return "poster";
}

async function optimizeImage(filePath) {
  const folder =
    path.basename(
      path.dirname(filePath)
    );

  const coverType =
    getCoverType(folder);

  const target =
    dimensions[coverType];

  const parsed =
    path.parse(filePath);

  const output =
    path.join(
      parsed.dir,
      `${parsed.name}.webp`
    );

  const before =
    fs.statSync(filePath).size;

  await sharp(filePath)
    .resize(
      target.width,
      target.height,
      {
        fit: "cover",
      }
    )
    .webp({
      quality: 85,
    })
    .toFile(output);

  const after =
    fs.statSync(output).size;

  console.log(`
${parsed.base}
${(
  before / 1024
).toFixed(0)} KB
↓
${(
  after / 1024
).toFixed(0)} KB
`);
}

async function scanFolder(folder) {
  const entries =
    fs.readdirSync(folder, {
      withFileTypes: true,
    });

  for (const entry of entries) {
    const fullPath =
      path.join(
        folder,
        entry.name
      );

    if (entry.isDirectory()) {
      await scanFolder(fullPath);
      continue;
    }

    const ext =
      path.extname(
        entry.name
      ).toLowerCase();

    if (
      IMAGE_EXTENSIONS.includes(
        ext
      )
    ) {
      await optimizeImage(
        fullPath
      );
    }
  }
}

await scanFolder(COVER_ROOT);

console.log(
  "\nAll covers optimized."
);