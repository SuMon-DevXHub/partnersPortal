import { defineStore, Store } from "pinia";

export const useFooterStore = defineStore("footer", () => {
  // state
  const isShowFooterRef = ref<boolean>(false);

  const isShowFooter = computed(() => isShowFooterRef.value);

  // actions
  const setIsShowFooter = (payload: boolean) => {    
    isShowFooterRef.value = payload;
  };
  return {
    isShowFooter,
    setIsShowFooter,
  };
});
