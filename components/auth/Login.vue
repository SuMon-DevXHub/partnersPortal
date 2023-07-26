<script setup>
import { USER_LOGIN, SECURITY_OTP } from "~/constants/urls";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useHeaderStore } from "~/stores/the-header";
import { useProfileStore } from "~/stores/the-profile";

const { setIsShowLoginModal } = useHeaderStore();
const { isShowLoginModal } = storeToRefs(useHeaderStore());
const { userInfo } = storeToRefs(useProfileStore());
const { fetch } = useFetched();
const { setAuthCookies, logout } = useAuth();
const nuxtApp = useNuxtApp();

const router = useRouter();
// data or state
const user = ref({
  email: "",
  password: "",
});
const showPassText = ref(true);
const rememberMe = ref(false);
// validations
const validations = computed(() => {
  return {
    email: { required, email },
    password: {
      required,
    },
  };
});
const $v = useVuelidate(validations, user);
const loginForm = ref(true);
const otpForm = ref(false);
const process = ref(false);
const saveEmailPassDuration = ref(60 * 60 * 24 * 3);
const setEmailCookies = useCookie("myEmailSharpArchive", {
  path: "/",
  maxAge: saveEmailPassDuration.value,
});
const setPasswordCookies = useCookie("myPasswordSharpArchive", {
  path: "/",
  maxAge: saveEmailPassDuration.value,
});
const setcookie = () => {
  if (rememberMe.value) {
    setEmailCookies.value = user.value.email;
    setPasswordCookies.value = user.value.password;
  }
};
const getcookiedate = () => {
  user.value.email = setEmailCookies.value ? setEmailCookies.value : "";
  user.value.password = setPasswordCookies.value
    ? setPasswordCookies.value
    : "";
};
const logIn = async () => {
  $v.value.$touch();
  if (!$v.value.$invalid) {
    process.value = true;
    try {
      const data = await $fetch(USER_LOGIN, {
        method: "POST",
        body: {
          username: user.value.email,
          password: user.value.password,
        },
      });
      if (data.success && data.message) {
        loginForm.value = false;
        otpForm.value = true;
        process.value = false;
      } else if (data.success && data.access) {
        setAuthCookies(data.access, data.refresh, true);
      } else {
        nuxtApp.$toast("error", {
          message: data.message,
          className: "toasted-bg-alert",
        });
        loginForm.value = true;
        otpForm.value = false;
        process.value = false;
      }
    } catch (error) {
      loginForm.value = true;
      otpForm.value = false;
    } finally {
      setTimeout(() => {
        process.value = false;
      }, 2000);
    }
  }
};
const submit = async (code) => {
  if (code && code.length === 6) {
    process.value = true;
    try {
      const data = await $fetch(SECURITY_OTP, {
        method: "POST",
        body: {
          username: user.value.email,
          password: user.value.password,
          otp: code,
        },
      });
      if (data.success) {
        setAuthCookies(data.access, data.refresh, true);
      } else {
        nuxtApp.$toast("error", {
          message: data.message,
          className: "toasted-bg-alert",
        });
        process.value = false;
      }
    } catch (error) {
      process.value = false;
    } finally {
      setTimeout(() => {
        process.value = false;
      }, 2000);
    }
  }
};
watch(
  () => userInfo.value,
  async (value) => {
    if (value && value.userPermission === "Partner") {
      console.log(value.userPermission, "value.userPermission");
      router.replace("/partners-portal");
    } else if (value && value.userPermission !== "Partner") {
      nuxtApp.$toast("error", {
        message: "No active account found with the given credentials",
        className: "toasted-bg-alert",
      });
      await logout().then((res) => {
        if (res) {
          router.replace("/");
          logoutProcess.value = false;
          setIsShowProfile(false);
        }
      });
    }
  },
  { deep: true }
);
const otpCode = ref("");
const verifyEmail = (code) => {
  otpCode.value = code;
};
const hideForm = () => {
  setIsShowLoginModal(false);
  loginForm.value = true;
  otpForm.value = false;
};
onMounted(() => {
  getcookiedate();
});
</script>

<template>
  <Transition name="slideInOut">
    <div
      v-if="isShowLoginModal"
      class="h-screen font-roboto top-0 right-0 fixed md:px-7 px-4 login overflow-hidden md:rounded-l-2xl md:shadow-none drop-shadow-2xl z-[4]"
      @click.stop=""
    >
      <form novalidate>
        <div>
          <div class="flex flex-row justify-between items-center pt-4">
            <div>
              <h3 class="text-[#E4801D] text-2xl md:hidden">Log In</h3>
            </div>
            <div class="md:hidden cursor-pointer" @click="hideForm()">
              <ClientOnly>
                <fa
                  class="text-orange-dark text-2xl"
                  :icon="['fas', 'times']"
                />
              </ClientOnly>
            </div>
          </div>
          <div
            class="absolute md:block hidden top-0 right-0 pr-5 pt-5 cursor-pointer"
            @click="hideForm()"
          >
            <ClientOnly>
              <fa class="text-orange-dark text-xl" :icon="['fas', 'times']" />
            </ClientOnly>
          </div>
          <div class="pt-12">
            <h3 class="text-[#E4801D] text-2xl md:block hidden">Log In</h3>
          </div>
          <div key="input-field" class="mt-5 w-full">
            <Transition name="globalFadeInFadeOut" mode="out-in">
              <div
                v-if="loginForm"
                class="flex flex-col space-y-4 min-h-[120px] justify-center"
              >
                <BaseInputText
                  id="email"
                  type="email"
                  v-model="$v.email.$model"
                  text-input="textInput px-4 pl-0 py-2 "
                  input-wrapper="inputWrapper rounded-full shadow-3xl bg-[#E4801D]"
                  place-holder-color="#FFFFFF"
                  place-holder="Email"
                  color="#FFFFFF"
                  background="#E4801D"
                  :error="$v.email.$error"
                  :error-message="$v.email.$errors"
                >
                  <template v-slot:icon-before>
                    <ClientOnly>
                      <BaseIconUserIcon class="text-white pl-4" />
                    </ClientOnly>
                  </template>
                </BaseInputText>
                <BaseInputText
                  id="password"
                  :type="showPassText ? 'password' : 'text'"
                  v-model="$v.password.$model"
                  text-input="textInput px-4 pl-0 py-2"
                  input-wrapper="inputWrapper rounded-full shadow-3xl bg-[#E4801D]"
                  place-holder-color="#FFFFFF"
                  place-holder="Password"
                  name="reg_passwd__"
                  auto-complete="new-password"
                  color="#FFFFFF"
                  background="#E4801D"
                  :error="$v.password.$error"
                  :error-message="$v.password.$errors"
                >
                  <template v-slot:icon-before>
                    <ClientOnly>
                      <BaseIconLockIcon class="text-white pl-4" />
                    </ClientOnly>
                  </template>
                  <template v-slot:icon-after>
                    <div
                      class="flex items-center"
                      @click="showPassText = !showPassText"
                    >
                      <ClientOnly>
                        <BaseIconEyeSlashIcon
                          v-if="showPassText"
                          class="text-white pr-4"
                        />
                        <BaseIconEyeIcon
                          v-else
                          class="text-white pr-4"
                        /> </ClientOnly
                      > 
                    </div>
                  </template>
                </BaseInputText>
              </div>
              <div
                v-else-if="otpForm"
                class="flex flex-col justify-center min-h-[204px]"
              >
                <BaseInputOtpVerification
                  @verified="verifyEmail($event)"
                  @submit="submit($event)"
                />
              </div>
            </Transition>
            <!-- </div> -->
            <Transition name="globalFadeInFadeOut">
              <div v-if="loginForm">
                <div
                  class="mt-7 relative flex flex-row justify-between items-center md:px-0 px-2"
                >
                  <label class="inline-flex items-center">
                    <input
                      v-model="rememberMe"
                      type="checkbox"
                      class="form-checkbox md:w-5 w-4 md:h-5 h-4 !bg-[#222831] border-offwhite-300 text-orange-midlight"
                    />
                    <span class="ml-2 text-[#C2C2C2] md:text-lg text-base"
                      >Remember me</span
                    >
                  </label>
                </div>
                <p
                  class="mb-6 text-[#E4801D] md:text-lg text-base cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>
            </Transition>
          </div>
        </div>
        <div
          ref="login"
          class="text-center login_button_div flex justify-center mt-[30px]"
        >
          <BaseButton
            class="w-44 h-10 text-white bg-[#E4801D] rounded-full border-none outline-none font-bold px-4"
            :text="loginForm ? 'Login' : 'Submit'"
            :disabled="process"
            @click.stop="loginForm ? [logIn(), setcookie()] : submit(otpCode)"
          />
        </div>
      </form>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/auth/login.scss";
</style>
