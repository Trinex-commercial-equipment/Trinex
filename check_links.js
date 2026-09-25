import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      scanDir(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes('unsplash.com') || content.includes('http://') || (content.includes('https://') && !content.includes('google.com') && !content.includes('instagram.com') && !content.includes('youtube.com') && !content.includes('wa.me') && !content.includes('fonts.googleapis.com') && !content.includes('w3.org'))) {
        console.log(`Found potential external image link in: ${filePath}`);
      }
    }
  });
}

scanDir('c:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\trinex\\src');
console.log('Link scan finished.');
