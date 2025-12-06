import { defineConfig } from 'vitepress'
import { sitemapPlugin } from './plugins/sitemap.js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const versions = JSON.parse(readFileSync(join(__dirname, 'versions.json'), 'utf-8'))
const currentVersion = versions.currentVersion
const defaultVersion = versions.versions.find(v => v.default) || versions.versions[0]

function getSidebarForVersion(versionConfig) {
  const versionPath = versionConfig.path || (versionConfig.default ? '/' : `/${versionConfig.version}/`)
  
  return {
    [`${versionPath}`]: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: `${versionPath}getting-started/installation` },
          { text: 'Quick Start', link: `${versionPath}getting-started/quickstart` },
          { text: 'Your First Component', link: `${versionPath}getting-started/first-component` }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Directives', link: `${versionPath}features/directives` },
          { text: 'Attributes', link: `${versionPath}features/attributes` },
          { text: 'Click Events', link: `${versionPath}features/click-events` },
          { text: 'Data Binding', link: `${versionPath}features/data-binding` },
          { text: 'Forms', link: `${versionPath}features/forms` },
          { text: 'Validation', link: `${versionPath}features/validation` },
          { text: 'Query String Binding', link: `${versionPath}features/query-string` },
          { text: 'Polling', link: `${versionPath}features/polling` },
          { text: 'Loading States', link: `${versionPath}features/loading-states` },
          { text: 'Error Handling', link: `${versionPath}features/error-handling` },
          { text: 'Component Events', link: `${versionPath}features/component-events` },
          { text: 'Redirects', link: `${versionPath}features/redirects` },
          { text: 'Pagination', link: `${versionPath}features/pagination` }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Component State', link: `${versionPath}advanced/component-state` },
          { text: 'Lifecycle Hooks', link: `${versionPath}advanced/lifecycle-hooks` },
          { text: 'Virtual DOM', link: `${versionPath}advanced/virtual-dom` },
          { text: 'Security', link: `${versionPath}advanced/security` },
          { text: 'Performance', link: `${versionPath}advanced/performance` },
          { text: 'Testing', link: `${versionPath}advanced/testing` },
          { text: 'WebSocket Transport', link: `${versionPath}advanced/websocket` }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Counter', link: `${versionPath}examples/counter` },
          { text: 'Todo List', link: `${versionPath}examples/todo-list` },
          { text: 'Contact Form', link: `${versionPath}examples/contact-form` },
          { text: 'Search', link: `${versionPath}examples/search` },
          { text: 'Confirmation Modal', link: `${versionPath}examples/confirmation-modal` },
          { text: 'Page Change Logger', link: `${versionPath}examples/page-change-logger` }
        ]
      }
    ]
  }
}

// Build sidebar for all versions
const sidebar = {}
versions.versions.forEach(version => {
  Object.assign(sidebar, getSidebarForVersion(version))
})

export default defineConfig({
  title: 'Diffyne',
  description: 'Blazing-fast, server-driven UI framework for PHP powered by a lightweight Virtual DOM + Diff Engine',
  
  base: '/',
  
  // Plugins
  vite: {
    plugins: [sitemapPlugin()]
  },
  
  head: [
    // Favicon
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    
    // Theme
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://diffyne.github.io/' }],
    ['meta', { property: 'og:title', content: 'Diffyne - Server-Driven UI for PHP' }],
    ['meta', { property: 'og:description', content: 'Blazing-fast, server-driven UI framework for PHP powered by a lightweight Virtual DOM + Diff Engine' }],
    ['meta', { property: 'og:image', content: 'https://diffyne.github.io/logo.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Diffyne Logo' }],
    ['meta', { property: 'og:site_name', content: 'Diffyne' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://diffyne.github.io/' }],
    ['meta', { name: 'twitter:title', content: 'Diffyne - Server-Driven UI for PHP' }],
    ['meta', { name: 'twitter:description', content: 'Blazing-fast, server-driven UI framework for PHP powered by a lightweight Virtual DOM + Diff Engine' }],
    ['meta', { name: 'twitter:image', content: 'https://diffyne.github.io/logo.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'Diffyne Logo' }],
    ['meta', { name: 'twitter:creator', content: '@diffyne' }],
    ['meta', { name: 'twitter:site', content: '@diffyne' }],
    
    // Additional SEO
    ['meta', { name: 'author', content: 'Diffyne' }],
    ['meta', { name: 'keywords', content: 'PHP, Laravel, Server-Driven UI, Virtual DOM, Reactive Components, Livewire Alternative, PHP Framework' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'English' }],
    ['meta', { name: 'revisit-after', content: '7 days' }],
    
    // Additional meta
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { 
        text: 'Guide', 
        link: defaultVersion.path === '/' 
          ? '/getting-started/installation' 
          : `${defaultVersion.path}getting-started/installation` 
      },
      { 
        text: 'Examples', 
        link: defaultVersion.path === '/' 
          ? '/examples/counter' 
          : `${defaultVersion.path}examples/counter` 
      },
      { 
        text: 'GitHub', 
        link: 'https://github.com/diffyne/diffyne',
        target: '_blank'
      }
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/diffyne/diffyne' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Diffyne'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/diffyne/docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated'
    }
  }
})

