import { h } from 'vue'
import VersionSelect from '../components/VersionSelect.vue'

export function versionSelectPlugin() {
  return {
    name: 'version-select-plugin',
    enhanceApp({ app }) {
      app.component('VersionSelect', VersionSelect)
    }
  }
}

