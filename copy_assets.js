import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a\\.user_uploaded';
const brainDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a';
const publicDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public';

const logoDir = path.join(publicDir, 'assets', 'logo');
const imgDir = path.join(publicDir, 'assets', 'images');

if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

// Copy User Reference Logo & Card
const logoSrc = path.join(userUploadedDir, 'media__1790339732327.png');
const cardSrc = path.join(userUploadedDir, 'media__1790339742323.jpg');

if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(logoDir, 'trinex_official_logo.png'));
  console.log('Copied official logo PNG');
}

if (fs.existsSync(cardSrc)) {
  fs.copyFileSync(cardSrc, path.join(logoDir, 'trinex_card_banner.jpg'));
  console.log('Copied official card JPG');
}

// Copy generated high-res photography
const heroSrc = path.join(brainDir, 'hero_kitchen_1790340193817.jpg');
const fridgeSrc = path.join(brainDir, 'commercial_refrigeration_1790340224128.jpg');
const cookSrc = path.join(brainDir, 'cooking_equipment_1790340270294.jpg');

if (fs.existsSync(heroSrc)) fs.copyFileSync(heroSrc, path.join(imgDir, 'hero_kitchen.jpg'));
if (fs.existsSync(fridgeSrc)) fs.copyFileSync(fridgeSrc, path.join(imgDir, 'commercial_refrigerator.jpg'));
if (fs.existsSync(cookSrc)) fs.copyFileSync(cookSrc, path.join(imgDir, 'cooking_range.jpg'));

console.log('Assets copy complete!');
