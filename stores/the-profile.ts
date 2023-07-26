import { defineStore } from "pinia";
import { ProfileInfo, TokenInfo } from "~/types/profile-info";

export const useProfileStore = defineStore("profile", () => {
  // state
  const router = useRouter();
  const isShowProfileRef = ref<boolean>(false);
  const userRef = ref<ProfileInfo | null>();
  const tokenCookieRef = ref<string | null>("");
  const refreshTokenCookieRef = ref<string | null>("");
  const loggedInRef = ref<boolean | null>(false);

  const showProfile = computed(() => isShowProfileRef.value);
  const userInfo = computed(() => userRef.value);
  const tokenCookie = computed(() => tokenCookieRef.value);
  const refreshTokenCookie = computed(() => refreshTokenCookieRef.value);
  const loggedIn = computed(() => loggedInRef.value);
  // actions
  const setIsShowProfile = (payload: boolean) => {
    isShowProfileRef.value = payload;
  };
  const setProfileInfo = (payload: ProfileInfo | null) => {
    userRef.value = payload;
  };
  const setToken = (payload: TokenInfo | null) => {
    tokenCookieRef.value = payload ? payload.token : null;
    refreshTokenCookieRef.value = payload ? payload.refresh : null;
    loggedInRef.value = payload ? payload.loggedIn : null;
  };
  const setReset = (payload: TokenInfo | null) => {
    tokenCookieRef.value = payload ? payload.token : null;
    refreshTokenCookieRef.value = payload ? payload.refresh : null;
    userRef.value = payload ? payload.user : null;
    loggedInRef.value = payload ? payload.loggedIn : null;
  };
  return {
    showProfile,
    userInfo,
    tokenCookie,
    refreshTokenCookie,
    loggedIn,
    setIsShowProfile,
    setProfileInfo,
    setToken,
    setReset,
  };
});
