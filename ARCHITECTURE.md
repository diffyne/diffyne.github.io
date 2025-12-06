# Documentation Architecture

This document explains the architecture and workflow of the Diffyne documentation system.

## Repository Structure

### Source Repository: `diffyne/docs`
- **Purpose**: Source of truth for all documentation
- **Location**: https://github.com/diffyne/docs
- **Content**: Raw markdown files organized by topic
- **Workflow**: Contributors edit documentation here

### Deployment Repository: `diffyne.github.io`
- **Purpose**: GitHub Pages deployment site
- **Location**: https://github.com/diffyne/diffyne.github.io
- **Content**: VitePress site with synced documentation
- **Workflow**: Automatically builds and deploys from source

## Data Flow

```
┌─────────────────┐
│  diffyne/docs   │  (Source Repository)
│                 │
│  - .md files    │
│  - Examples     │
│  - Guides       │
└────────┬────────┘
         │
         │ Sync (npm run sync)
         │
         ▼
┌────────────────────┐
│ diffyne.github.io  │  (Deployment Repository)
│                    │
│  - VitePress       │
│  - Build config    │
│  - GitHub Actions  │
└────────────────────┘
```

## Sync Process

### Manual Sync

1. Edit docs in `diffyne/docs`
2. Run sync script:
   ```bash
   cd diffyne.github.io
   DOCS_SOURCE_PATH=../docs npm run sync
   ```
3. Review changes
4. Commit and push

### Automated Sync

GitHub Actions automatically:
1. Checks out both repositories
2. Syncs documentation
3. Builds VitePress site
4. Deploys to GitHub Pages

Triggered by:
- Push to `main` branch
- Manual workflow dispatch
- Scheduled (daily sync)

## File Structure

### Source Repository (`diffyne/docs`)
```
docs/
├── getting-started/
│   ├── installation.md
│   ├── quickstart.md
│   └── first-component.md
├── features/
│   ├── directives.md
│   ├── data-binding.md
│   └── ...
├── examples/
│   ├── counter.md
│   └── ...
└── advanced/
    ├── security.md
    └── ...
```

### Deployment Repository (`diffyne.github.io`)
```
diffyne.github.io/
├── docs/
│   ├── .vitepress/
│   │   └── config.js      # VitePress configuration
│   ├── guide/             # Synced from source (docs/guide/)
│   │   ├── getting-started/
│   │   ├── features/
│   │   └── ...
│   └── index.md           # Homepage
├── scripts/
│   └── sync-docs.js       # Sync script
├── .github/
│   └── workflows/
│       ├── deploy.yml     # Deployment workflow
│       └── sync-docs.yml  # Sync workflow
└── package.json
```

## Sync Script Features

The `sync-docs.js` script:
1. **Copies** markdown files from source
2. **Adds** VitePress frontmatter if missing
3. **Fixes** relative links to work with VitePress routing
4. **Preserves** directory structure
5. **Logs** all synced files

## GitHub Actions Workflows

### `deploy.yml`
- **Trigger**: Push to `main`
- **Steps**:
  1. Checkout deployment repo
  2. Checkout docs source repo
  3. Install dependencies
  4. Sync documentation
  5. Build VitePress site
  6. Deploy to GitHub Pages

### `sync-docs.yml`
- **Trigger**: Manual or scheduled
- **Purpose**: Keep docs in sync
- **Steps**:
  1. Checkout both repos
  2. Sync documentation
  3. Commit and push if changes detected

## Benefits of This Architecture

### Separation of Concerns
- **Source repo**: Focus on content
- **Deployment repo**: Focus on presentation

### Independent Versioning
- Documentation changes don't affect deployment setup
- Deployment improvements don't clutter docs history

### Automated Workflow
- No manual deployment steps
- Always in sync
- Fast iteration

### Contributor-Friendly
- Contributors only need to edit markdown
- No need to understand VitePress
- Simple pull request workflow

## Maintenance

### Adding New Documentation
1. Add `.md` file to `diffyne/docs`
2. Sync to deployment repo (automatic or manual)
3. Update VitePress sidebar config if needed

### Updating VitePress Config
1. Edit `docs/.vitepress/config.js`
2. Commit and push to `diffyne.github.io`
3. Site rebuilds automatically

### Troubleshooting
- Check GitHub Actions logs
- Verify sync script output
- Test locally with `npm run dev`

## Future Improvements

- [ ] Automated link checking
- [ ] Preview deployments for PRs
- [ ] Documentation analytics
- [ ] Search improvements
- [ ] Multi-language support

