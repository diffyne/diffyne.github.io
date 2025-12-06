import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import VersionSelect from '../components/VersionSelect.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VersionSelect', VersionSelect)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () => h(VersionSelect)
    })
  }
}

