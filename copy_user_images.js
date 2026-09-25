import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\Mohithsai Malla\\.gemini\\antigravity\\brain\\11edda58-4666-4031-b0e3-49af27bff58a\\.user_uploaded';
const publicDir = 'c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\public';

const logoDir = path.join(publicDir, 'assets', 'logo');
const imgDir = path.join(publicDir, 'assets', 'images');

if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const files = [
  { src: 'media__1790339732327.png', logo: 'trinex_official_logo.png' },
  { src: 'media__1790339737656.png', logo: 'trinex_logo_badge.png' },
  { src: 'media__1790339742323.jpg', logo: 'trinex_card_banner.jpg' },
  { src: 'media__1790341861335.jpg', img: 'trinex_induction_banner.jpg' }
];

files.forEach(f => {
  const srcPath = path.join(userUploadedDir, f.src);
  if (fs.existsSync(srcPath)) {
    if (f.logo) {
      fs.copyFileSync(srcPath, path.join(logoDir, f.logo));
      console.log(`Copied ${f.src} -> ${f.logo}`);
    }
    if (f.img) {
      fs.copyFileSync(srcPath, path.join(imgDir, f.img));
      console.log(`Copied ${f.src} -> ${f.img}`);
    }
  }
});

console.log('All user reference images copied successfully!');
