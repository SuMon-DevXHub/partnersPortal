import { defineStore } from 'pinia'

interface PageColor{
  color: string,
  backgroundColor: string,
  activeBackgroundColor: string,
}

export const usePageColorStore = defineStore("pagecolor", () => {
  // state
  const colorRef = ref<PageColor | null>(null)

  const getColor = computed(() => colorRef.value)

  // actions
  const setPageColor = (payload: PageColor | null) => {
    colorRef.value = payload
  }
  return {
    getColor,
    setPageColor,
  }
})