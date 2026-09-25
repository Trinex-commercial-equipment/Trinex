import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const userUploadedDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a\\.user_uploaded';
const outputDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public\\assets\\images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function cropPristineCategoryImages() {
  try {
    const bannerPath = path.join(userUploadedDir, 'media__1790341861335.jpg');
    console.log('Loading banner image for category cropping...');
    const image = await Jimp.read(bannerPath);

    const w = image.bitmap.width;
    const h = image.bitmap.height;
    console.log(`Banner dimensions: ${w} x ${h}`);

    const categoryCrops = [
      // Induction Category: Full clean top row of hobs
      { name: 'induction_cat.jpg', x: 0.16, y: 0.22, w: 0.68, h: 0.30 },
      
      // Heavy Duty Cooking: Double Burner Stove & Stock Stove
      { name: 'cooking_equipment_cat.jpg', x: 0.17, y: 0.50, w: 0.30, h: 0.35 },
      
      // Refrigeration & Holding: Upright Cabinets together
      { name: 'refrigeration_cat.jpg', x: 0.44, y: 0.50, w: 0.23, h: 0.35 },
      
      // Food Prep: Wok Cooker & Prep Stoves
      { name: 'food_prep_cat.jpg', x: 0.33, y: 0.21, w: 0.34, h: 0.30 },
      
      // Steamer & Holding Cabinets: Steamer Cabinet with trays
      { name: 'steamer_holding_cat.jpg', x: 0.44, y: 0.50, w: 0.12, h: 0.35 },
      
      // Stainless Steel Equipment: Wok Station with Sink & Splashback
      { name: 'stainless_steel_cat.jpg', x: 0.65, y: 0.50, w: 0.20, h: 0.35 }
    ];

    for (const c of categoryCrops) {
      const cropX = Math.floor(c.x * w);
      const cropY = Math.floor(c.y * h);
      const cropW = Math.floor(c.w * w);
      const cropH = Math.floor(c.h * h);

      const clone = image.clone();
      clone.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      const outPath = path.join(outputDir, c.name);
      await clone.write(outPath);
      console.log(`Saved pristine category image: ${c.name}`);
    }

    console.log('Pristine category images generated!');
  } catch (err) {
    console.error('Error in category crop:', err);
  }
}

cropPristineCategoryImages();
