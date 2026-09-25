import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a\\.user_uploaded';
const outputDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public\\assets\\images';

const banners = [
  { src: 'media__1790344916052.jpg', target: 'category_induction.jpg' },
  { src: 'media__1790344915850.jpg', target: 'category_cooking.jpg' },
  { src: 'media__1790344810932.jpg', target: 'category_refrigeration.jpg' },
  { src: 'media__1790344806774.jpg', target: 'category_food_prep.jpg' },
  { src: 'media__1790344801539.jpg', target: 'category_holding_steamer.jpg' }
];

banners.forEach(b => {
  const srcPath = path.join(userUploadedDir, b.src);
  const targetPath = path.join(outputDir, b.target);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, targetPath);
    console.log(`Restored clean original: ${b.target}`);
  }
});

console.log('Original category banners restored without any gray patches!');
