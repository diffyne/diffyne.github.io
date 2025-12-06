#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VERSIONS_CONFIG = join(__dirname, '../docs/.vitepress/versions.json');

if (!existsSync(VERSIONS_CONFIG)) {
  console.error('❌ versions.json not found!');
  process.exit(1);
}

const versions = JSON.parse(readFileSync(VERSIONS_CONFIG, 'utf-8'));

console.log('📚 Syncing all versions...\n');

for (const version of versions.versions) {
  console.log(`📦 Syncing version: ${version.version}`);
  try {
    execSync(`DOCS_VERSION=${version.version} node scripts/sync-docs.js`, {
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
    console.log(`✅ Version ${version.version} synced successfully\n`);
  } catch (error) {
    console.error(`❌ Failed to sync version ${version.version}:`, error.message);
    process.exit(1);
  }
}

console.log('✅ All versions synced successfully!');

