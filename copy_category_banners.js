import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a\\.user_uploaded';
const outputDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public\\assets\\images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Map the 5 newly uploaded category banners
const banners = [
  { src: 'media__1790344916052.jpg', target: 'category_induction.jpg' }, // Commercial Induction Cooking
  { src: 'media__1790344915850.jpg', target: 'category_cooking.jpg' },   // Commercial Heavy Duty Cooking
  { src: 'media__1790344810932.jpg', target: 'category_refrigeration.jpg' }, // Commercial Refrigeration
  { src: 'media__1790344806774.jpg', target: 'category_food_prep.jpg' },   // Commercial Food Prep
  { src: 'media__1790344801539.jpg', target: 'category_holding_steamer.jpg' } // Commercial Holding & Steamer
];

banners.forEach(b => {
  const srcPath = path.join(userUploadedDir, b.src);
  const targetPath = path.join(outputDir, b.target);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, targetPath);
    console.log(`Copied ${b.src} -> ${b.target}`);
  } else {
    console.warn(`File not found: ${b.src}`);
  }
});

console.log('Category banner copy complete!');
