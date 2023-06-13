import { defineStore, Store } from 'pinia'

export const useHeaderStore = defineStore("header", () => {
  // state
  const userModalRef = ref<boolean>(false)

  const isUserModal = computed(() => userModalRef.value)

  // actions
  const setIsUserModal = (payload: boolean) => {
      userModalRef.value = payload
  }
  return {
    isUserModal,
    setIsUserModal,
  }
})