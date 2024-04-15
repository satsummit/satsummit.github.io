import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const dir = './content/people/media';
  const dirContent = fs.readdirSync(dir);

  await Promise.all(
    dirContent.map(async (file) => {
      const p = path.join(dir, file);

      const img = sharp(p);
      const metadata = await img.metadata();

      const { width, height } = metadata;

      const solid = await sharp({
        create: {
          width,
          height,
          channels: 4,
          background: { r: 26, g: 91, b: 219, alpha: 1 }
        }
      })
        .png()
        .toBuffer();

      const buff = await img
        .greyscale()
        .modulate({ brightness: 0.9 })
        .linear(1.12)
        .composite([{ input: solid, blend: 'screen' }])
        .png()
        .toBuffer();

      // To be able to replace the original file.
      await sharp(buff).toFile(p);

      /* eslint-disable-next-line no-console */
      console.log('Processed', p);
    })
  );
}

main();
