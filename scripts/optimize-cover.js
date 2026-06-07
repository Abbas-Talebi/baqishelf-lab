import sharp from "sharp";
import path from "node:path";

const inputPath = process.argv[2];
const coverType = process.argv[3] || "poster";

if (!inputPath) {
  console.error("No image provided");
  process.exit(1);
}

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

const target =
  dimensions[coverType] ??
  dimensions.poster;

const parsed =
  path.parse(inputPath);

const outputPath =
  path.join(
    parsed.dir,
    `${parsed.name}.webp`
  );

try {
  const metadata =
    await sharp(inputPath)
      .metadata();

  console.log(
    `Original: ${metadata.width}x${metadata.height}`
  );

  await sharp(inputPath)
    .resize(
      target.width,
      target.height,
      {
        fit: "cover",
        position: "centre",
      }
    )
    .webp({
      quality: 85,
    })
    .toFile(outputPath);

  console.log(
    `Saved: ${outputPath}`
  );
} catch (error) {
  console.error(error);
}