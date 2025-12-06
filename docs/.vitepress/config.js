import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Diffyne',
  description: 'Blazing-fast, server-driven UI framework for PHP powered by a lightweight Virtual DOM + Diff Engine',
  
  base: '/',
  
  // Ignore dead links during build
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started/installation' },
      { text: 'Examples', link: '/examples/counter' },
      { 
        text: 'GitHub', 
        link: 'https://github.com/diffyne/diffyne',
        target: '_blank'
      }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quickstart' },
            { text: 'Your First Component', link: '/getting-started/first-component' }
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Directives', link: '/features/directives' },
            { text: 'Attributes', link: '/features/attributes' },
            { text: 'Click Events', link: '/features/click-events' },
            { text: 'Data Binding', link: '/features/data-binding' },
            { text: 'Forms', link: '/features/forms' },
            { text: 'Validation', link: '/features/validation' },
            { text: 'Query String Binding', link: '/features/query-string' },
            { text: 'Polling', link: '/features/polling' },
            { text: 'Loading States', link: '/features/loading-states' },
            { text: 'Error Handling', link: '/features/error-handling' },
            { text: 'Component Events', link: '/features/component-events' },
            { text: 'Redirects', link: '/features/redirects' },
            { text: 'Pagination', link: '/features/pagination' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Component State', link: '/advanced/component-state' },
            { text: 'Lifecycle Hooks', link: '/advanced/lifecycle-hooks' },
            { text: 'Virtual DOM', link: '/advanced/virtual-dom' },
            { text: 'Security', link: '/advanced/security' },
            { text: 'Performance', link: '/advanced/performance' },
            { text: 'Testing', link: '/advanced/testing' },
            { text: 'WebSocket Transport', link: '/advanced/websocket' }
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Counter', link: '/examples/counter' },
            { text: 'Todo List', link: '/examples/todo-list' },
            { text: 'Contact Form', link: '/examples/contact-form' },
            { text: 'Search', link: '/examples/search' },
            { text: 'Confirmation Modal', link: '/examples/confirmation-modal' },
            { text: 'Page Change Logger', link: '/examples/page-change-logger' }
          ]
        }
      ]
    },

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

