import { defineStore, Store } from "pinia";

export const useProfileStore = defineStore("profile", () => {
  // state
  const isShowProfileRef = ref<boolean>(false);

  const showProfile = computed(() => isShowProfileRef.value);

  // actions
  const setIsShowProfile = (payload: boolean) => {
    isShowProfileRef.value = payload;
  };
  return {
    showProfile,
    setIsShowProfile,
  };
});
