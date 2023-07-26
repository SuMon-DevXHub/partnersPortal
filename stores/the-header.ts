import { defineStore, Store } from 'pinia'

export const useHeaderStore = defineStore("header", () => {
  // state
  const userModalRef = ref<boolean>(false)
  const showLoginModal = ref<boolean>(true)

  const isUserModal = computed(() => userModalRef.value)
  const isShowLoginModal = computed(() => showLoginModal.value)

  // actions
  const setIsUserModal = (payload: boolean) => {
    userModalRef.value = payload
  }
  const setIsShowLoginModal = (payload: boolean) => {
    showLoginModal.value = payload
  }
  return {
    isUserModal,
    setIsUserModal,
    isShowLoginModal,
    setIsShowLoginModal,
  }
})