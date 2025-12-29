#!/usr/bin/env node
/**
 * Generate responsive image variants (500w, 800w) for portfolio
 * Run: node scripts/generate-responsive-images.js
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const SIZES = [300, 500, 800]; // Added 300w for mobile optimization
const INPUT_DIR = 'public/images/portfolio';
const OUTPUT_DIR = 'public/images/portfolio';

async function generateVariants() {
  const files = await readdir(INPUT_DIR);
  const images = files.filter(f => /\.(webp|jpg|jpeg|png|avif)$/i.test(f) && !/-\d+\.(webp|avif)$/.test(f));

  console.log(`Found ${images.length} source images`);

  for (const file of images) {
    const inputPath = join(INPUT_DIR, file);
    const name = basename(file, extname(file));

    for (const width of SIZES) {
      // Generate WebP
      const webpPath = join(OUTPUT_DIR, `${name}-${width}.webp`);
      if (!existsSync(webpPath)) {
        try {
          await sharp(inputPath)
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality: 70, effort: 6 }) // Reduced quality for smaller files
            .toFile(webpPath);
          console.log(`  Created: ${name}-${width}.webp`);
        } catch (err) {
          console.error(`  Error WebP: ${file} -> ${err.message}`);
        }
      }

      // Generate AVIF (better compression, smaller files)
      const avifPath = join(OUTPUT_DIR, `${name}-${width}.avif`);
      if (!existsSync(avifPath)) {
        try {
          await sharp(inputPath)
            .resize(width, null, { withoutEnlargement: true })
            .avif({ quality: 60, effort: 4 }) // Reduced quality for smaller files, faster encoding
            .toFile(avifPath);
          console.log(`  Created: ${name}-${width}.avif`);
        } catch (err) {
          console.error(`  Error AVIF: ${file} -> ${err.message}`);
        }
      }
    }
  }

  console.log('\nDone! AVIF and WebP variants generated.');
}

generateVariants().catch(console.error);
