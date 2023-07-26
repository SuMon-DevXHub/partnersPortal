import { useProfileStore } from "~/stores/the-profile";
import { USER_PROFILE, USER_LOGOUT } from "~/constants/urls";

export const useAuth = () => {
  const { fetch } = useFetched();
  const tokenCookie: any = useCookie("token", {
    maxAge: 1200,
  });
  const refreshTokenCookie: any = useCookie("refresh", {
    maxAge: 1200,
  });
  const userInfo: any = useCookie("userInfo", {
    maxAge: 1200,
  });
  const loggedIn: any = useCookie("loggedIn", {
    maxAge: 1200,
  });

  const { setProfileInfo, setToken, setReset } = useProfileStore();

  const user = computed(() => {
    return useProfileStore().userInfo;
  });

  const logout = async () => {
    return new Promise((resolve, reject) => {
      try {
        fetch(
          USER_LOGOUT,
          {
            body: {
              refresh: refreshTokenCookie.value,
            },
            method: "POST",
          },
          null
        )
          .then((response: any) => {
            if (response.detail === "Successfully logged out.") {
              tokenCookie.value = null;
              refreshTokenCookie.value = null;
              // userInfo.value = null
              loggedIn.value = null;
              setTimeout(() => {
                setReset({
                  token: "",
                  refresh: "",
                  user: null,
                  loggedIn: false,
                });
              });
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const fetchUser = async () => {
    console.log(tokenCookie.value, user.value, userInfo.value, "user");
    if (tokenCookie.value && !user.value) {
      const data: any = await fetch(USER_PROFILE, null, tokenCookie.value);
      if (data) {
        userInfo.value = data.data;
        setProfileInfo(userInfo.value);
      }
    }
  };
  const updateProcess = ref(false);
  const updateUserProfile = async (personalInfo: any) => {
    const formData = new FormData();
    Object.keys(personalInfo).forEach((key) => {
      formData.append(key, personalInfo[key]);
    });

    return new Promise(async (resolve, reject) => {
      try {
        updateProcess.value = true;
        await fetch(
          USER_PROFILE,
          {
            method: "PUT",
            body: formData
          },
          null
        )
          .then((response: any) => {
            if (response.success) {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      } finally {
        updateProcess.value = false;
      }
    });
  };

  const setAuthCookies = (
    token: string,
    refresh: string,
    userLoggedIn: boolean
  ) => {
    tokenCookie.value = token ? token : tokenCookie.value;
    refreshTokenCookie.value = refresh ? refresh : refreshTokenCookie.value;
    loggedIn.value = userLoggedIn ? userLoggedIn : loggedIn.value;
    fetchUser();
    setToken({
      token: tokenCookie.value,
      refresh: refreshTokenCookie.value,
      loggedIn: loggedIn.value,
    });
  };

  return {
    logout,
    fetchUser,
    setAuthCookies,
    updateUserProfile,
    tokenCookie,
    refreshTokenCookie,
    userInfo,
    loggedIn,
    updateProcess,
  };
};
