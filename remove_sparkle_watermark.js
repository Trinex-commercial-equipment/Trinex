import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const imgDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public\\assets\\images';

const imagesToClean = [
  'category_induction.jpg',
  'category_cooking.jpg',
  'category_refrigeration.jpg',
  'category_food_prep.jpg',
  'category_holding_steamer.jpg'
];

async function removeSparkleWatermark() {
  try {
    for (const filename of imagesToClean) {
      const filePath = path.join(imgDir, filename);
      if (!fs.existsSync(filePath)) continue;

      const img = await Jimp.read(filePath);
      const w = img.bitmap.width;
      const h = img.bitmap.height;

      console.log(`Processing ${filename} (${w}x${h})...`);

      // Target bottom-right sparkle region (roughly 85%-97% X, 78%-94% Y)
      const startX = Math.floor(w * 0.86);
      const endX = Math.floor(w * 0.96);
      const startY = Math.floor(h * 0.78);
      const endY = Math.floor(h * 0.94);

      // Sample clean adjacent dark background color from just above/left of the watermark
      const sampleX = Math.floor(w * 0.84);
      const sampleY = Math.floor(h * 0.85);
      const bgPixel = img.getPixelColor(sampleX, sampleY);

      // Fill the watermark patch area with sampled clean background pixel color
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          if (x < w && y < h) {
            img.setPixelColor(bgPixel, x, y);
          }
        }
      }

      await img.write(filePath);
      console.log(`Cleaned watermark from ${filename}`);
    }
    console.log('Watermark removal complete!');
  } catch (err) {
    console.error('Error removing watermark:', err);
  }
}

removeSparkleWatermark();
