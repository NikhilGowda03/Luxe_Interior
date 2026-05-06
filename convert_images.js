import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';
const files = fs.readdirSync(publicDir);

async function convert() {
  for (const file of files) {
    if (file.endsWith('.svg') && !file.includes('favicon')) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace('.svg', '.webp'));
      
      console.log(`Converting ${inputPath} to ${outputPath}...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully converted ${file}`);
      } catch (err) {
        console.error(`Failed to convert ${file}: ${err.message}`);
        if (err.message.includes('XML_PARSE_HUGE')) {
          console.log(`Attempting fallback for ${file}...`);
          try {
            // Try to read as buffer and pass to sharp
            const buffer = fs.readFileSync(inputPath);
            await sharp(buffer, { failOn: 'none', density: 72 })
              .webp({ quality: 80 })
              .toFile(outputPath);
            console.log(`Successfully converted ${file} with fallback`);
          } catch (fallbackErr) {
             console.error(`Fallback failed for ${file}: ${fallbackErr.message}`);
          }
        }
      }
    }
  }
}

convert();
