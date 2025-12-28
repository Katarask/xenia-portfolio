#!/usr/bin/env node
/**
 * Generate responsive image variants (500w, 800w) for portfolio
 * Run: node scripts/generate-responsive-images.js
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const SIZES = [500, 800];
const INPUT_DIR = 'public/images/portfolio';
const OUTPUT_DIR = 'public/images/portfolio';

async function generateVariants() {
  const files = await readdir(INPUT_DIR);
  const images = files.filter(f => /\.(webp|jpg|jpeg|png|avif)$/i.test(f) && !/-\d+\.webp$/.test(f));

  console.log(`Found ${images.length} source images`);

  for (const file of images) {
    const inputPath = join(INPUT_DIR, file);
    const name = basename(file, extname(file));

    for (const width of SIZES) {
      const outputPath = join(OUTPUT_DIR, `${name}-${width}.webp`);

      if (existsSync(outputPath)) {
        console.log(`  Skip: ${name}-${width}.webp (exists)`);
        continue;
      }

      try {
        await sharp(inputPath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`  Created: ${name}-${width}.webp`);
      } catch (err) {
        console.error(`  Error: ${file} -> ${err.message}`);
      }
    }
  }

  console.log('\nDone! Now update Portfolio.jsx with srcset.');
}

generateVariants().catch(console.error);
