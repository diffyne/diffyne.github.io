import { writeFileSync, readdirSync, existsSync, readFileSync } from 'fs'
import { join, extname, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function getMarkdownFiles(dir, basePath = '') {
    const files = []

    if (!existsSync(dir)) {
        return files
    }

    const entries = readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = join(dir, entry.name)
        const relativePath = join(basePath, entry.name)

        if (entry.isDirectory()) {
            if (entry.name !== '.vitepress' && entry.name !== 'node_modules' && entry.name !== 'public') {
                files.push(...getMarkdownFiles(fullPath, relativePath))
            }
        } else if (entry.isFile() && extname(entry.name) === '.md') {
            let urlPath = '/' + relativePath.replace(/\.md$/, '').replace(/\\/g, '/')
            if (urlPath.endsWith('/index')) {
                urlPath = urlPath.replace(/\/index$/, '')
            }
            if (urlPath.endsWith('/README')) {
                urlPath = urlPath.replace(/\/README$/, '')
            }
            if (urlPath === '/index' || urlPath === '/README') {
                urlPath = '/'
            }
            files.push(urlPath)
        }
    }

    return files
}

export function sitemapPlugin() {
    let outDir = ''
    let base = '/'

    return {
        name: 'sitemap-plugin',
        configResolved(config) {
            const relativeOutDir = config.build.outDir || '.vitepress/dist'
            outDir = resolve(process.cwd(), 'docs', relativeOutDir)
            base = config.base || '/'
        },
        closeBundle() {
            const baseUrl = 'https://diffyne.github.io'
            const lastmod = new Date().toISOString().split('T')[0]

            // Load versions configuration
            const versionsPath = join(__dirname, '..', 'versions.json')
            let versions = { versions: [{ version: 'latest', path: '/', default: true }] }
            if (existsSync(versionsPath)) {
                versions = JSON.parse(readFileSync(versionsPath, 'utf-8'))
            }

            const pages = []
            const docsDir = join(__dirname, '..', '..')

            // Process each version
            for (const version of versions.versions) {
                const versionPath = version.path === '/' ? '' : version.path.replace(/\/$/, '')
                const versionDocsDir = version.default ? docsDir : join(docsDir, version.version)

                // Add homepage for this version
                const homeUrl = baseUrl + (base === '/' ? '' : base.replace(/\/$/, '')) + versionPath + '/'
                pages.push({
                    loc: homeUrl,
                    lastmod,
                    changefreq: 'daily',
                    priority: '1.0'
                })

                // Get markdown files for this version
                if (existsSync(versionDocsDir)) {
                    const markdownFiles = getMarkdownFiles(versionDocsDir, '')
                    
                    markdownFiles.forEach(path => {
                        if (path === '/' || path === '') return

                        // Skip version directories (they're handled separately)
                        if (versions.versions.some(v => path.startsWith(`/${v.version}/`))) {
                            return
                        }

                        const fullPath = baseUrl + (base === '/' ? '' : base.replace(/\/$/, '')) + versionPath + path
                        const priority = path.startsWith('/getting-started') ? '0.9' :
                            path.startsWith('/features') ? '0.8' :
                                path.startsWith('/advanced') ? '0.7' : '0.6'

                        pages.push({
                            loc: fullPath,
                            lastmod,
                            changefreq: 'weekly',
                            priority
                        })
                    })
                }
            }

            // Remove duplicates and sort
            const uniquePages = Array.from(
                new Map(pages.map(page => [page.loc, page])).values()
            ).sort((a, b) => a.loc.localeCompare(b.loc))

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

            const sitemapPath = join(outDir, 'sitemap.xml')
            writeFileSync(sitemapPath, sitemap, 'utf-8')
            console.log(`✓ Generated sitemap.xml with ${uniquePages.length} pages for ${versions.versions.length} version(s)`)
        }
    }
}

