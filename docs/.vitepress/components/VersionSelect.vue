<template>
  <div class="version-select">
    <select v-model="currentVersion" @change="switchVersion" class="version-select-input">
      <option v-for="version in versions" :key="version.version" :value="version.version">
        {{ version.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vitepress'
import versionsData from '../versions.json'

const router = useRouter()
const route = useRoute()
const versions = ref(versionsData.versions)
const currentVersion = ref(versionsData.currentVersion)

function getVersionFromPath(path) {
  const match = path.match(/^\/([^/]+)\//)
  return match ? match[1] : versionsData.currentVersion
}

function switchVersion() {
  const versionConfig = versions.value.find(v => v.version === currentVersion.value)
  if (!versionConfig) return
  
  // Redirect to the homepage of the selected version
  const newPath = versionConfig.path === '/' ? '/' : versionConfig.path
  router.go(newPath)
}

onMounted(() => {
  const versionFromPath = getVersionFromPath(route.path)
  if (versionFromPath && versions.value.find(v => v.version === versionFromPath)) {
    currentVersion.value = versionFromPath
  }
})
</script>

<style scoped>
.version-select {
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
}

.version-select-input {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 2rem;
}

.version-select-input:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.version-select-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.2);
}
</style>

