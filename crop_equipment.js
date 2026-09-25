import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const userUploadedDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a\\.user_uploaded';
const outputDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public\\assets\\images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function cropAllEquipment() {
  try {
    const bannerPath = path.join(userUploadedDir, 'media__1790341861335.jpg');
    const cardPath = path.join(userUploadedDir, 'media__1790341861335.jpg');
    const card2Path = path.join(userUploadedDir, 'media__1790339742323.jpg');

    console.log('Loading image with Jimp...');
    const image = await Jimp.read(bannerPath);
    const cardImg = await Jimp.read(card2Path);

    const w = image.bitmap.width;
    const h = image.bitmap.height;
    console.log(`Banner dimensions: ${w} x ${h}`);

    // Define crops as percentages of width and height for resolution invariance
    const crops = [
      { name: 'countertop_induction_hob.png', x: 0.17, y: 0.24, w: 0.17, h: 0.25 },
      { name: 'induction_wok_cooker.png', x: 0.34, y: 0.22, w: 0.16, h: 0.27 },
      { name: 'stock_pot_stove.png', x: 0.50, y: 0.24, w: 0.17, h: 0.25 },
      { name: 'digital_induction_cooker.png', x: 0.67, y: 0.27, w: 0.16, h: 0.22 },
      { name: 'undercounter_stock_stove.png', x: 0.18, y: 0.51, w: 0.12, h: 0.33 },
      { name: 'double_burner_range.png', x: 0.30, y: 0.51, w: 0.15, h: 0.33 },
      { name: 'steamer_cabinet.png', x: 0.45, y: 0.50, w: 0.10, h: 0.34 },
      { name: 'holding_cabinet.png', x: 0.55, y: 0.52, w: 0.11, h: 0.32 },
      { name: 'chinese_wok_station.png', x: 0.66, y: 0.51, w: 0.17, h: 0.33 },
      
      // Category Images
      { name: 'induction_cat.jpg', x: 0.16, y: 0.20, w: 0.68, h: 0.35 },
      { name: 'cooking_equipment_cat.jpg', x: 0.17, y: 0.50, w: 0.30, h: 0.35 },
      { name: 'steamer_holding_cat.jpg', x: 0.45, y: 0.50, w: 0.22, h: 0.35 },
      { name: 'wok_stations_cat.jpg', x: 0.66, y: 0.50, w: 0.18, h: 0.35 },
    ];

    for (const c of crops) {
      const cropX = Math.floor(c.x * w);
      const cropY = Math.floor(c.y * h);
      const cropW = Math.floor(c.w * w);
      const cropH = Math.floor(c.h * h);

      const clone = image.clone();
      clone.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      const outPath = path.join(outputDir, c.name);
      await clone.write(outPath);
      console.log(`Saved cropped image: ${c.name}`);
    }

    // Crop equipment from visiting card for refrigeration & stainless steel categories
    const cardW = cardImg.bitmap.width;
    const cardH = cardImg.bitmap.height;

    const cardCrops = [
      { name: 'refrigeration_cat.jpg', x: 0.04, y: 0.18, w: 0.25, h: 0.35 },
      { name: 'stainless_steel_cat.jpg', x: 0.46, y: 0.22, w: 0.13, h: 0.35 },
      { name: 'food_prep_cat.jpg', x: 0.05, y: 0.34, w: 0.10, h: 0.20 }
    ];

    for (const c of cardCrops) {
      const cropX = Math.floor(c.x * cardW);
      const cropY = Math.floor(c.y * cardH);
      const cropW = Math.floor(c.w * cardW);
      const cropH = Math.floor(c.h * cardH);

      const clone = cardImg.clone();
      clone.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      const outPath = path.join(outputDir, c.name);
      await clone.write(outPath);
      console.log(`Saved card cropped image: ${c.name}`);
    }

    console.log('All individual equipment photos cropped successfully!');
  } catch (err) {
    console.error('Error cropping images:', err);
  }
}

cropAllEquipment();
