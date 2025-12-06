#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
// Default assumes docs repo is cloned as sibling directory
const DOCS_SOURCE = process.env.DOCS_SOURCE_PATH || join(__dirname, '../../docs');
const DOCS_TARGET = join(__dirname, '../docs/guide');

console.log('📚 Syncing documentation...');
console.log(`Source: ${DOCS_SOURCE}`);
console.log(`Target: ${DOCS_TARGET}`);

// Ensure target directory exists
mkdirSync(DOCS_TARGET, { recursive: true });

// Function to recursively copy and convert markdown files
function syncDirectory(sourceDir, targetDir, basePath = '') {
  const entries = readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      // Skip certain directories
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue;
      }

      mkdirSync(targetPath, { recursive: true });
      syncDirectory(sourcePath, targetPath, join(basePath, entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Read source file
      let content = readFileSync(sourcePath, 'utf-8');

      // Add VitePress frontmatter if not present
      if (!content.startsWith('---')) {
        const frontmatter = generateFrontmatter(entry.name, basePath);
        content = frontmatter + '\n\n' + content;
      }

      // Fix relative links
      content = fixLinks(content, basePath);
      
      // Fix syntax highlighting issues
      content = fixSyntaxHighlighting(content);

      // Write to target
      writeFileSync(targetPath, content, 'utf-8');
      console.log(`✓ Synced: ${join(basePath, entry.name)}`);
    }
  }
}

// Generate VitePress frontmatter
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

// Fix relative links in markdown
function fixLinks(content, basePath) {
  // Fix ../ links
  content = content.replace(/\]\(\.\.\//g, '](/guide/');
  
  // Fix ./ links in same directory
  content = content.replace(/\]\(\.\//g, '](/guide/');
  
  // Fix links to other sections
  content = content.replace(/\]\(([^)]+\.md)\)/g, (match, path) => {
    // Convert relative paths to absolute guide paths
    if (path.startsWith('../')) {
      const relativePath = path.replace('../', '');
      return `](/guide/${relativePath})`;
    }
    if (path.startsWith('./')) {
      const relativePath = path.replace('./', '');
      return `](/guide/${basePath}/${relativePath})`;
    }
    return match;
  });

  return content;
}

// Fix syntax highlighting issues
function fixSyntaxHighlighting(content) {
  // Replace 'env' language with 'bash' (VitePress doesn't support 'env')
  content = content.replace(/```env\n/g, '```bash\n');
  
  // Remove any stray HTML closing tags that might break VitePress
  // This is a safety measure for malformed markdown
  content = content.replace(/^(\s*)<\/[a-z]+>\s*$/gm, '');
  
  return content;
}

// Start sync
try {
  syncDirectory(DOCS_SOURCE, DOCS_TARGET);
  console.log('\n✅ Documentation sync complete!');
} catch (error) {
  console.error('\n❌ Error syncing documentation:', error);
  process.exit(1);
}

