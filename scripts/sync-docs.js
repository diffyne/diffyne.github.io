#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, unlinkSync, rmdirSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_SOURCE = process.env.DOCS_SOURCE_PATH || join(__dirname, '../../docs');
const DOCS_TARGET = join(__dirname, '../docs');
const VERSIONS_CONFIG = join(__dirname, '../docs/.vitepress/versions.json');

console.log('📚 Syncing documentation...');
console.log(`Source: ${DOCS_SOURCE}`);
console.log(`Target: ${DOCS_TARGET}`);

// Load versions configuration
let versions = { versions: [{ version: 'latest', label: 'Latest', branch: 'main', path: '/', default: true }], currentVersion: 'latest' };
if (existsSync(VERSIONS_CONFIG)) {
  versions = JSON.parse(readFileSync(VERSIONS_CONFIG, 'utf-8'));
}

const defaultVersion = versions.versions.find(v => v.default) || versions.versions[0];
const TARGET_VERSION = process.env.DOCS_VERSION || defaultVersion.version;
const versionConfig = versions.versions.find(v => v.version === TARGET_VERSION) || defaultVersion;
const TARGET_BRANCH = versionConfig.branch || TARGET_VERSION;

console.log(`📦 Syncing version: ${TARGET_VERSION} from branch: ${TARGET_BRANCH}`);

// Checkout the appropriate branch if DOCS_SOURCE_PATH is a git repository
if (existsSync(join(DOCS_SOURCE, '.git'))) {
  try {
    console.log(`🔄 Checking out branch: ${TARGET_BRANCH}`);
    execSync(`git checkout ${TARGET_BRANCH}`, { 
      cwd: DOCS_SOURCE,
      stdio: 'inherit'
    });
    execSync(`git pull origin ${TARGET_BRANCH}`, { 
      cwd: DOCS_SOURCE,
      stdio: 'inherit'
    });
    console.log(`✅ Switched to branch: ${TARGET_BRANCH}`);
  } catch (error) {
    console.warn(`⚠️  Could not checkout branch ${TARGET_BRANCH}, using current branch`);
  }
}

mkdirSync(DOCS_TARGET, { recursive: true });

function clearOldFiles(targetDir, versionDir, isRoot = false) {
  const entries = readdirSync(targetDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = join(targetDir, entry.name);
    
    // Skip version directories and special directories
    if (entry.isDirectory()) {
      if (entry.name === '.vitepress' || entry.name === 'public' || entry.name === 'node_modules' || entry.name === '.git') {
        continue;
      }
      // Skip other version directories
      if (versions.versions.some(v => v.version === entry.name && v.version !== versionDir)) {
        continue;
      }
      
      clearOldFiles(entryPath, versionDir, false);
      try {
        const subEntries = readdirSync(entryPath);
        if (subEntries.length === 0) {
          rmdirSync(entryPath);
        }
      } catch (e) {
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (isRoot && (entry.name === 'index.md' || entry.name === 'README.md')) {
        continue;
      }
      unlinkSync(entryPath);
    }
  }
}

// Determine target directory based on version
const targetVersionDir = versionConfig.default ? DOCS_TARGET : join(DOCS_TARGET, TARGET_VERSION);

console.log('🧹 Cleaning old files...');
try {
  if (existsSync(targetVersionDir) && readdirSync(targetVersionDir).length > 0) {
    clearOldFiles(targetVersionDir, TARGET_VERSION, true);
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
        const frontmatter = generateFrontmatter(entry.name, basePath, TARGET_VERSION);
        content = frontmatter + '\n\n' + content;
      }

      writeFileSync(targetPath, content, 'utf-8');
      console.log(`✓ Synced: ${join(basePath, entry.name)}`);
    }
  }
}

function generateFrontmatter(filename, basePath, version) {
  const title = filename
    .replace('.md', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `---
title: ${title}
description: ${title} - Diffyne Documentation
version: ${version}
---`;
}

try {
  mkdirSync(targetVersionDir, { recursive: true });
  syncDirectory(DOCS_SOURCE, targetVersionDir);
  console.log(`\n✅ Documentation sync complete for version: ${TARGET_VERSION}!`);
} catch (error) {
  console.error('\n❌ Error syncing documentation:', error);
  process.exit(1);
}

