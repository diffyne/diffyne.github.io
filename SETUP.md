# Setup Guide for Diffyne Documentation Site

This guide will help you set up the Diffyne documentation site repository (`diffyne.github.io`) and link it with the source documentation repository (`diffyne/docs`).

## Repository Structure

- **`diffyne/docs`** - Source documentation repository (where you edit docs)
- **`diffyne.github.io`** - Deployment repository (this repo, for GitHub Pages)

## Initial Setup

### 1. Clone Both Repositories

```bash
# Clone the deployment repository
git clone https://github.com/diffyne/diffyne.github.io.git
cd diffyne.github.io

# Clone the docs source repository (as sibling)
cd ..
git clone https://github.com/diffyne/docs.git
cd diffyne.github.io
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Sync Documentation

```bash
# If docs repo is cloned as sibling directory
npm run sync

# Or specify custom path
DOCS_SOURCE_PATH=../docs npm run sync
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the documentation site.

## Development Workflow

### Making Documentation Changes

1. **Edit in source repo** (`diffyne/docs`):
   ```bash
   cd ../docs
   # Make your changes to .md files
   git add .
   git commit -m "docs: update installation guide"
   git push
   ```

2. **Sync to deployment repo**:
   ```bash
   cd ../diffyne.github.io
   npm run sync
   ```

3. **Preview locally**:
   ```bash
   npm run dev
   ```

4. **Deploy** (if you want to deploy manually):
   ```bash
   npm run build
   git add .
   git commit -m "docs: sync from source"
   git push
   ```

### Automated Deployment

The repository is configured with GitHub Actions to automatically:
- Sync docs when you push to `main`
- Build the VitePress site
- Deploy to GitHub Pages

Just push to `main` and the site will be deployed automatically.

## Using Git Submodule (Recommended)

For a more robust setup, you can use Git submodules:

```bash
# Add docs repo as submodule
git submodule add https://github.com/diffyne/docs.git docs-source
git submodule update --init --recursive
```

Then update the sync script or use:
```bash
DOCS_SOURCE_PATH=./docs-source npm run sync
```

## Configuration

### VitePress Config

Edit `docs/.vitepress/config.js` to customize:
- Navigation menu
- Sidebar structure  
- Theme settings
- Search configuration

### GitHub Pages Settings

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (created automatically by GitHub Actions)
4. Folder: `/ (root)`

## Troubleshooting

### Sync Script Fails

- Check that the docs repo path is correct
- Ensure the docs repo contains `.md` files
- Check file permissions

### Build Fails

- Verify Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules .vitepress/cache && npm install`
- Check for syntax errors in markdown files

### GitHub Actions Fails

- Check Actions tab for error logs
- Verify repository has Pages enabled
- Ensure workflow has correct permissions (should be automatic)

## Next Steps

- Read the [README.md](./README.md) for more details
- Check [VitePress documentation](https://vitepress.dev/) for customization options
- Review the [GitHub Actions workflow](./.github/workflows/deploy.yml)

