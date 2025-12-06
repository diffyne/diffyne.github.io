#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, unlinkSync, rmdirSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_SOURCE = process.env.DOCS_SOURCE_PATH || join(__dirname, '../../docs');
const DOCS_TARGET = join(__dirname, '../docs');

console.log('📚 Syncing documentation...');
console.log(`Source: ${DOCS_SOURCE}`);
console.log(`Target: ${DOCS_TARGET}`);

mkdirSync(DOCS_TARGET, { recursive: true });

function clearOldFiles(targetDir, isRoot = false) {
  const entries = readdirSync(targetDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = join(targetDir, entry.name);
    
    if (entry.isDirectory()) {
      clearOldFiles(entryPath, false);
      try {
        const subEntries = readdirSync(entryPath);
        if (subEntries.length === 0) {
          rmdirSync(entryPath);
        }
      } catch (e) {
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (isRoot && entry.name === 'index.md') {
        continue;
      }
      unlinkSync(entryPath);
    }
  }
}

console.log('🧹 Cleaning old files...');
try {
  if (readdirSync(DOCS_TARGET).length > 0) {
    clearOldFiles(DOCS_TARGET, true);
  }
} catch (e) {
}

function syncDirectory(sourceDir, targetDir, basePath = '') {
  const entries = readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue;
      }

      mkdirSync(targetPath, { recursive: true });
      syncDirectory(sourcePath, targetPath, join(basePath, entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      let content = readFileSync(sourcePath, 'utf-8');

      if (!content.startsWith('---')) {
        const frontmatter = generateFrontmatter(entry.name, basePath);
        content = frontmatter + '\n\n' + content;
      }

      writeFileSync(targetPath, content, 'utf-8');
      console.log(`✓ Synced: ${join(basePath, entry.name)}`);
    }
  }
}

function generateFrontmatter(filename, basePath) {
  const title = filename
    .replace('.md', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `---
title: ${title}
description: ${title} - Diffyne Documentation
---`;
}

try {
  syncDirectory(DOCS_SOURCE, DOCS_TARGET);
  console.log('\n✅ Documentation sync complete!');
} catch (error) {
  console.error('\n❌ Error syncing documentation:', error);
  process.exit(1);
}

