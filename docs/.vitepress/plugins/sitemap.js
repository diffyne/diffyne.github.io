import { writeFileSync, readdirSync, existsSync } from 'fs'
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

            const pages = []

            const homeUrl = baseUrl + (base === '/' ? '' : base.replace(/\/$/, ''))
            pages.push({
                loc: homeUrl || baseUrl,
                lastmod,
                changefreq: 'daily',
                priority: '1.0'
            })

            const docsDir = join(__dirname, '..', '..')
            const markdownFiles = getMarkdownFiles(docsDir)

            console.log(`Found ${markdownFiles.length} markdown files in ${docsDir}`)

            const uniqueFiles = [...new Set(markdownFiles)].sort()

            uniqueFiles.forEach(path => {
                if (path === '/' || path === '') return

                const fullPath = baseUrl + (base === '/' ? '' : base.replace(/\/$/, '')) + path
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

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

            const sitemapPath = join(outDir, 'sitemap.xml')
            writeFileSync(sitemapPath, sitemap, 'utf-8')
            console.log(`✓ Generated sitemap.xml with ${pages.length} pages`)
        }
    }
}

