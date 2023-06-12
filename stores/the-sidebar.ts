import { defineStore, Store } from 'pinia'

export const useSidebarStore = defineStore("sidebar", () => {
  // state
  const isSqueezeRef = ref<boolean>(false)

  const isSqueeze = computed(() => isSqueezeRef.value)

  // actions
  const setIsSqueeze = (payload: boolean) => {
    isSqueezeRef.value = payload
  }
  return {
    isSqueeze,
    setIsSqueeze,
  }
})