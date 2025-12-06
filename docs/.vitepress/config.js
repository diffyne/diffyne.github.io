import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Diffyne',
  description: 'Blazing-fast, server-driven UI framework for PHP powered by a lightweight Virtual DOM + Diff Engine',
  
  base: '/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
      { 
        text: 'GitHub', 
        link: 'https://github.com/diffyne/diffyne',
        target: '_blank'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quickstart' },
            { text: 'Your First Component', link: '/guide/first-component' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Components', link: '/guide/components' },
            { text: 'Properties & State', link: '/guide/properties' },
            { text: 'Methods & Actions', link: '/guide/methods' },
            { text: 'Lifecycle Hooks', link: '/guide/lifecycle' }
          ]
        },
        {
          text: 'Building UIs',
          items: [
            { text: 'Directives', link: '/guide/directives' },
            { text: 'Event Handling', link: '/guide/events' },
            { text: 'Data Binding', link: '/guide/data-binding' },
            { text: 'Forms', link: '/guide/forms' },
            { text: 'Validation', link: '/guide/validation' }
          ]
        },
        {
          text: 'Advanced Features',
          items: [
            { text: 'Query String Binding', link: '/guide/query-string' },
            { text: 'Polling & Real-time', link: '/guide/polling' },
            { text: 'Loading States', link: '/guide/loading-states' },
            { text: 'Error Handling', link: '/guide/error-handling' },
            { text: 'Component Events', link: '/guide/component-events' },
            { text: 'Redirects', link: '/guide/redirects' }
          ]
        },
        {
          text: 'Advanced Topics',
          items: [
            { text: 'Security', link: '/guide/security' },
            { text: 'Performance', link: '/guide/performance' },
            { text: 'Testing', link: '/guide/testing' },
            { text: 'WebSocket Transport', link: '/guide/websocket' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Counter', link: '/examples/counter' },
            { text: 'Todo List', link: '/examples/todo-list' },
            { text: 'Contact Form', link: '/examples/contact-form' },
            { text: 'Search', link: '/examples/search' },
            { text: 'Confirmation Modal', link: '/examples/confirmation-modal' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/diffyne/diffyne' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Diffyne'
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

