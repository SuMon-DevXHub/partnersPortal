import { useProfileStore } from "~/stores/the-profile";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setAuthCookies, userInfo } = useAuth();
  setAuthCookies();
  const user = computed(() => {
    return useProfileStore().userInfo;
  });
  const loggedIn = computed(() => {
    return useProfileStore().loggedIn;
  });
  if (
    loggedIn.value &&
    (user.value?.paymentStatus === "" || userInfo.value?.paymentStatus === "")
  ) {
    return navigateTo("/payment-method");
  }
});
