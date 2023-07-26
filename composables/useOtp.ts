import {
  EMAIL_VERIFY,
  RESEND_EMAIL,
  RESEND_PHONE,
  forgotPassword,
  USER_STORAGE,
} from "~/constants/urls";
import { useFetched } from "~/composables/useFetched";

export const emailVerify = () => {
  const nuxtApp = useNuxtApp();
  const reSendProcess = ref(false);
  const sendCodeProcess = ref(false);
  const hideEmailField = ref(false);
  const hideOtpField = ref(true);
  const hidePasswordModal = ref(true);
  const showPasswordField = ref(false);
  const closeModal = ref(false);

  const verifyEmailOtp = async (data: any, emit: any) => {
    try {
      reSendProcess.value = true;
      const res = await $fetch(EMAIL_VERIFY, {
        method: "POST",
        body: data,
      });
      nuxtApp.$toast("clear");
      if (res.success) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        if (emit) {
          emit("verified", { status: res.success, type: "email" });
        } else {
          closeModal.value = true;
        }
        store.commit("confirm/SET_PASSWORD_VALIDITY", false);
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
        reSendProcess.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resendEmailVerifyCode = async (data: any, location = null) => {
    try {
      reSendProcess.value = true;
      sendCodeProcess.value = true;

      const res = await $fetch(`${location ? RESEND_EMAIL : forgotPassword}`, {
        method: "POST",
        body: data,
      });
      nuxtApp.$toast("clear");
      if (res.success) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        if (location === null) {
          hideEmailField.value = true;
          hidePasswordModal.value = false;
          hideOtpField.value = false;
          // setTimeout(() => {
          //   store.dispatch("showEmailVerifyModal", true);
          // }, 700);
          sendCodeProcess.value = false;
          reSendProcess.value = false;
        }
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
        sendCodeProcess.value = false;
        reSendProcess.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyForgetPasswordEmailOtp = async (data, location = null, emit) => {
    try {
      reSendProcess.value = true;
      const res = await $fetch(EMAIL_VERIFY, {
        method: "POST",
        body: data,
      });
      nuxtApp.$toast("clear");
      if (res.success) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        if (location) {
          emit("verified", { status: res.success, type: "email" });
          // this.$emit('verified', { status: res.success, type: 'email' })
        } else {
          // store.dispatch("showEmailVerifyModal", false);
          // this.showEmailVerifyModal(false)
          // setTimeout(() => {
          hideOtpField.value = true;
          showPasswordField.value = true;
          // this.$v.$reset()
          // }, 700);
        }
        // store.commit("confirm/SET_PASSWORD_VALIDITY", false);
        if (emit) {
          emit("isValidPassword");
        }
        // this.close()
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      reSendProcess.value = false;
    }
  };
  const resendPasswordConfirmEmailVerifyCode = async (
    data,
    location = null
  ) => {
    try {
      reSendProcess.value = true;
      sendCodeProcess.value = true;
      const res = await $fetch(`${location ? RESEND_EMAIL : forgotPassword}`, {
        method: "POST",
        body: data,
      });
      nuxtApp.$toast("clear");
      if (res.success) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        if (location === null) {
          hideEmailField.value = true;
          hidePasswordModal.value = false;
          setTimeout(() => {
            store.dispatch("showPasswordConfirmEmailVerifyModal", true);
            // this.showPasswordConfirmEmailVerifyModal(true)
          }, 700);
          sendCodeProcess.value = false;
        }
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
        sendCodeProcess.value = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      reSendProcess.value = false;
    }
  };

  return {
    reSendProcess,
    sendCodeProcess,
    hideEmailField,
    showPasswordField,
    hidePasswordModal,
    closeModal,
    hideOtpField,
    verifyEmailOtp,
    resendEmailVerifyCode,
    resendPasswordConfirmEmailVerifyCode,
    verifyForgetPasswordEmailOtp,
  };
};

export const phoneVerify = () => {
  const nuxtApp = useNuxtApp();
  const store = useStore();
  const reSendProcess = ref(false);
  const activeComponent = ref("");
  const { setAuthCookies } = useAuth();
  const { fetch } = useFetched();

  const storeUserStorage = async () => {
    const res = await $fetch(USER_STORAGE, {
      method: "POST",
      body: store.getters["feeds/getStorageInfo"],
    });
    if (res.success) {
      console.log(res.success, "setting/storage");
    }
  };
  const verifyPhoneOtp = async (data, location = null, emit) => {
    try {
      reSendProcess.value = true;
      const res = await fetch(PHONE_VERIFY, {
        method: "POST",
        body: data,
      });
      nuxtApp.$toast("clear");
      if (res.success) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        if (location) {
          emit("verified", { status: res.success, type: "phone" });
          console.log("data", res.data.access, res.data.refresh);
          setAuthCookies(res.data.access, res.data.refresh, true);
          store.dispatch("feeds/enablePayment");
          // storeUserStorage()
        } else {
          activeComponent.value = "VerificationMessage";
          if (emit) {
            emit("newPhone", this.phone);
          }
        }
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
        reSendProcess.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resendPhoneVerifyCode = async (data, location = null) => {
    try {
      reSendProcess.value = true;
      let res;
      if (store.state.auth.tokenCookie) {
        res = await fetch(RESEND_PHONE, {
          method: "POST",
          body: data,
        });
      } else {
        res = await $fetch(RESEND_PHONE, {
          method: "POST",
          body: data,
        });
      }
      nuxtApp.$toast("clear");
      if (res.success) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        reSendProcess.value = false;
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
        reSendProcess.value = false;
      }
    } catch (error) {
      console.log(error);
      reSendProcess.value = false;
    }
  };

  return {
    reSendProcess,
    verifyPhoneOtp,
    resendPhoneVerifyCode,
  };
};
