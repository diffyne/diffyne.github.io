# Diffyne Documentation Site

This repository contains the documentation site for [Diffyne](https://github.com/diffyne/diffyne), built with [VitePress](https://vitepress.dev/).

## Repository Structure

This is a **deployment repository** for GitHub Pages. The actual documentation source lives in the [diffyne/docs](https://github.com/diffyne/docs) repository.

```
diffyne.github.io/          # This repo (deployment)
├── docs/                   # VitePress documentation
│   ├── .vitepress/        # VitePress configuration
│   ├── guide/             # Synced from diffyne/docs repo
│   └── index.md           # Homepage
├── scripts/                # Build and sync scripts
└── .github/workflows/     # GitHub Actions for deployment
```

## Setup

### Prerequisites

- Node.js 24+ and npm
- Access to the main diffyne repository

### Initial Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com/diffyne/diffyne.github.io.git
   cd diffyne.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Sync documentation from docs repo:**
   
   If you have the docs repo cloned locally:
   ```bash
   DOCS_SOURCE_PATH=../docs npm run sync
   ```
   
   Or manually copy the docs:
   ```bash
   # Adjust path to your docs repo location
   cp -r ../docs/* docs/guide/
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173` to preview the documentation.

## Development Workflow

### Local Development

1. Make changes to documentation in the **[diffyne/docs](https://github.com/diffyne/docs)** repository
2. Sync changes to this repo:
   ```bash
   DOCS_SOURCE_PATH=../docs npm run sync
   ```
3. Preview locally:
   ```bash
   npm run dev
   ```
4. Build and test:
   ```bash
   npm run build
   npm run preview
   ```

### Deployment

Documentation is automatically deployed via GitHub Actions when you push to the `main` branch.

**Manual deployment:**
```bash
npm run deploy
git add .
git commit -m "Update documentation"
git push
```

The GitHub Actions workflow will:
1. Checkout this repository
2. Checkout the docs repository (`diffyne/docs`)
3. Install dependencies
4. Sync docs from the docs repo
5. Build the VitePress site
6. Deploy to GitHub Pages

## Syncing Documentation

### Option 1: Automated Sync Script

The sync script copies and converts markdown files from the docs repo:

```bash
DOCS_SOURCE_PATH=/path/to/docs npm run sync
```

### Option 2: Git Submodule (Recommended for Production)

Add the docs repo as a submodule:

```bash
git submodule add https://github.com/diffyne/docs.git docs-source
git submodule update --init --recursive
```

Then update the sync script to use the submodule path.

### Option 3: Manual Copy

Manually copy files from the main repo's `packages/docs/` directory to `docs/guide/`.

## Configuration

### VitePress Config

Edit `docs/.vitepress/config.js` to customize:
- Navigation menu
- Sidebar structure
- Theme settings
- Search configuration

### GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (created by GitHub Actions)
4. Folder: `/ (root)`

## Project Structure

```
docs/
├── .vitepress/
│   └── config.js          # VitePress configuration
├── guide/                 # Documentation pages (synced)
│   ├── getting-started/
│   ├── features/
│   ├── examples/
│   └── advanced/
├── examples/              # Example pages
└── index.md               # Homepage
```

## Troubleshooting

### Build Fails

- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules .vitepress/cache && npm install`
- Check for broken links: `npm run build` will show errors

### Sync Issues

- Verify source path is correct
- Check file permissions
- Ensure markdown files are valid

### Deployment Issues

- Check GitHub Actions logs
- Verify repository has Pages enabled
- Ensure workflow has correct permissions

## Contributing

**Important:** Always make documentation changes in the [diffyne/docs](https://github.com/diffyne/docs) repository, not in this deployment repository.

1. Edit files in the `diffyne/docs` repository
2. Sync changes to this repo (or let GitHub Actions handle it)
3. Test locally with `npm run dev`
4. Commit and push to deploy

## License

Same license as the main Diffyne project (MIT).

