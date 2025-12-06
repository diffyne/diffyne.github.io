# Quick Start Guide

Get the Diffyne documentation site up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Git installed
- Access to both repositories

## Step 1: Clone Repositories

```bash
# Clone the deployment repository
git clone https://github.com/diffyne/diffyne.github.io.git
cd diffyne.github.io

# Clone the docs source repository (as sibling)
cd ..
git clone https://github.com/diffyne/docs.git
cd diffyne.github.io
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Sync Documentation

```bash
npm run sync
```

This copies all documentation from `../docs` to `docs/guide/`.

## Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## That's It! 🎉

You now have:
- ✅ Documentation synced from source
- ✅ VitePress development server running
- ✅ Hot reload on file changes

## Next Steps

### Making Changes

1. **Edit documentation** in `../docs/`
2. **Sync changes**: `npm run sync`
3. **Preview**: Changes appear automatically in dev server

### Building for Production

```bash
npm run build
npm run preview
```

### Deploying

Just push to `main` branch - GitHub Actions will handle deployment automatically!

```bash
git add .
git commit -m "docs: update"
git push
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run sync         # Sync docs from source
npm run build        # Build for production
npm run preview      # Preview production build

# All-in-one
npm run deploy       # Sync + build
```

## Troubleshooting

**Sync fails?**
- Check that `../docs` exists
- Verify path: `DOCS_SOURCE_PATH=/custom/path npm run sync`

**Build fails?**
- Clear cache: `rm -rf node_modules .vitepress/cache && npm install`
- Check Node version: `node --version` (should be 18+)

**Dev server not starting?**
- Check port 5173 is available
- Try: `npm run dev -- --port 3000`

## Need Help?

- Read [SETUP.md](./SETUP.md) for detailed setup
- Read [README.md](./README.md) for full documentation
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview

