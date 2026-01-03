// Script pour générer les icônes PWA
// Nécessite: npm install sharp --save-dev
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Couleur de fond romantique (rose clair)
const backgroundColor = '#fdf2f8';
const heartColor = '#ec4899';

// SVG du cœur pour les icônes
const heartSVG = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="${backgroundColor}"/>
  <path d="M256 448l-19.2-17.6C133.6 319.2 64 273.6 64 192 64 115.2 124.8 64 192 64c41.6 0 81.6 19.2 108 52.8C326.4 83.2 366.4 64 408 64 483.2 64 544 115.2 544 192c0 81.6-69.6 127.2-172.8 238.4L256 448z" fill="${heartColor}"/>
</svg>
`;

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Créer le dossier public s'il n'existe pas
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sizes = [
    { size: 192, name: 'pwa-192x192.png' },
    { size: 512, name: 'pwa-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
  ];

  for (const { size, name } of sizes) {
    const outputPath = path.join(publicDir, name);
    
    // Générer l'icône à partir du SVG
    await sharp(Buffer.from(heartSVG))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Créé: ${name} (${size}x${size})`);
  }

  console.log('\n✅ Toutes les icônes ont été générées avec succès!');
}

generateIcons().catch(console.error);

