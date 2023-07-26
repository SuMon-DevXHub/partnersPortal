import { useProfileStore } from "~/stores/the-profile";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setAuthCookies } = useAuth();
  setAuthCookies();
  const loggedIn = computed(() => {
    return useProfileStore().loggedIn;
  });
  if (loggedIn.value) {
    return navigateTo("/partners-portal");
  } else {
    if (to.path == "/") {
      return navigateTo("/login");
    }
  }
});
