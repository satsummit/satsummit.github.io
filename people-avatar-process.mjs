import sharp from 'sharp';
import { glob } from 'glob';

async function main() {
  const dirContent = await glob('content/people/**/media/*');

  await Promise.all(
    dirContent.map(async (file) => {
      const img = sharp(file);
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
      await sharp(buff).toFile(file);

      /* eslint-disable-next-line no-console */
      console.log('Processed', file);
    })
  );
}

main();
