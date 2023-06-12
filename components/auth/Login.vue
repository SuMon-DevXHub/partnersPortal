<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

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
</script>

<template>
  <Transition name="slideInOut">
    <div
      class="h-screen font-roboto top-0 right-0 fixed md:px-7 px-4 login overflow-hidden md:rounded-l-2xl md:shadow-none drop-shadow-2xl z-[4]"
      @click.stop=""
    >
      <form novalidate @submit.prevent="">
        <div>
          <div class="flex flex-row justify-between items-center pt-4">
            <div>
              <h3 class="text-white text-2xl md:hidden">Log In</h3>
            </div>
          </div>
          <div class="pt-12">
            <h3 class="text-white text-2xl md:block hidden">Log In</h3>
          </div>
          <div key="input-field" class="mt-5 w-full">
            <div class="flex flex-col space-y-4">
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
            <!-- </div> -->
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
            <p class="mb-6 text-[#E4801D] md:text-lg text-base cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </div>
        <div
          ref="login"
          class="text-center login_button_div flex justify-center mt-[30px]"
        >
          <BaseButton
            class="w-44 h-10 text-white bg-[#E4801D] rounded-full border-none outline-none font-bold px-4"
            text="Login"
          />
        </div>
      </form>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/auth/login.scss";
</style>
