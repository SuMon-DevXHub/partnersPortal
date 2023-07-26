<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { passwordReset } from "~/constants/urls";

// types
interface PersonalInformation {
  email: string;
}
interface ConfirmPassword {
  newPassword: string;
  confirmPassword: string;
}
// State
const changePassword = ref<PersonalInformation>({
  email: "",
});
const confirmPassword = ref<ConfirmPassword>({
  newPassword: "",
  confirmPassword: "",
});
const showCurrentPassword = ref(true);
const showEmailField = ref(true);
const showOtpField = ref(false);
const showNewPassword = ref(true);
const showConfirmPassword = ref(true);
// Validations
const { containsValidPassword } = useInputValidations();
const validations = computed(() => {
  return {
    email: { required, email },
  };
});
const validations1 = computed(() => {
  return {
    newPassword: {
      required,
      minLength: minLength(12),
      maxLength: maxLength(80),
      containsValidPassword: helpers.withMessage(
        "Need Uppercase, Lowercase letter, Number and Special Character",
        containsValidPassword
      ),
    },
    confirmPassword: {
      required,
      sameAs: sameAs(confirmPassword.value.newPassword),
    },
  };
});
const $v = useVuelidate(validations, changePassword);
const $v1 = useVuelidate(validations1, confirmPassword);
const {
  verifyForgetPasswordEmailOtp,
  resendEmailVerifyCode,
  hideEmailField,
  hideOtpField,
  showPasswordField,
  sendCodeProcess,
} = emailVerify();
const otpCode = ref("");
const verifyEmail = (code: string) => {
  otpCode.value = code;
  if (code && code.length === 6) {
    verifyForgetPasswordEmailOtp(
      {
        email: changePassword.value.email,
        otp: code,
      },
      null,
      null
    );
  }
};
const nuxtApp = useNuxtApp();
const passwordResetProcess = ref(false);
const { fetch } = useFetched();
const newPasswordReset = async () => {
  nuxtApp.$toast("clear");
  $v1.value.$touch();
  if (!$v1.value.$invalid) {
    try {
      passwordResetProcess.value = true;
      const res = await fetch(passwordReset, {
        method: "POST",
        body: {
          email: changePassword.value.email,
          password: confirmPassword.value.newPassword,
          otp: otpCode.value,
        },
      });
      nuxtApp.$toast("clear");
      if (res.status === 200) {
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        resetAll();
      } else {
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      passwordResetProcess.value = false;
    }
  }
};
const resetAll = () => {
  setTimeout(() => {
    hideEmailField.value = false;
    hideOtpField.value = false;
  }, 500);
  showPasswordField.value = false;
  changePassword.value.email = "";
  confirmPassword.value.newPassword = "";
  confirmPassword.value.confirmPassword = "";
  $v.value.$reset();
  $v1.value.$reset();
};
</script>

<template>
  <div class="px-0 md:px-[8%]">
    <h2 class="text-[#8DB230] text-lg text-center md:text-left py-[30px]">
      Change your password
    </h2>

    <div class="flex flex-col space-y-16">
      <Transition name="globalFadeInFadeOut" mode="out-in">
        <BaseInputText
          v-if="!hideEmailField"
          id="email"
          type="email"
          name="email"
          label="Email"
          v-model="$v.email.$model"
          class="h-[50px] max-w-[424px] relative"
          text-input="px-4 py-3 rounded-md shadow-3xl xl:text-2xl md:text-xl text-lg"
          placeHolderClass="placeholder:text-lg"
          input-wrapper="inputWrapper"
          place-holder="Email"
          color="#8DB230"
          background="#E8EBED"
          place-holder-color="#656565"
          :error="$v.email.$error"
          :error-message="$v.email.$errors"
          @resendCode:modelValue="
            resendEmailVerifyCode({ email: changePassword.email })
          "
        >
        </BaseInputText>
        <!-- <BaseInputText
        id="currentPassword"
        class="h-[50px] max-w-[424px] relative"
        name="currentPassword"
        :type="showCurrentPassword ? 'password' : 'text'"
        label="Current Password"
        text-input="px-4 py-3 rounded-md shadow-3xl xl:text-2xl md:text-xl text-lg"
        place-holder=""
        placeHolderClass="placeholder:text-lg"
        input-wrapper="inputWrapper"
        color="#8DB230"
        background="#E8EBED"
        place-holder-color="#656565"
        v-model.trim="$v.currentPassword.$model"
        :error="$v.currentPassword.$error"
        :error-message="$v.currentPassword.$errors"
      >
        <template v-slot:icon-after>
          <div
            class="flex items-center h-[50px] self-end absolute right-3"
            @click="showCurrentPassword = !showCurrentPassword"
          >
            <ClientOnly>
              <BaseIconEyeSlashIcon
                v-if="showCurrentPassword"
                class="text-black"
              />
              <BaseIconEyeIcon v-else class="text-black" /> </ClientOnly
            > 
          </div>
        </template>
      </BaseInputText> -->
        <BaseInputOtpVerification
          v-else-if="!hideOtpField"
          input-border-style="border-b-2 border-green-1100"
          input-text-style="text-3xl text-black text-center"
          resend-button-color="text-black"
          @verified="verifyEmail($event)"
          @resendCode="resendEmailVerifyCode({ email: changePassword.email })"
        />
        <div v-else-if="showPasswordField" class="flex flex-col space-y-16">
          <BaseInputText
            id="newPassword"
            class="h-[50px] max-w-[424px] relative"
            name="newPassword"
            :type="showNewPassword ? 'password' : 'text'"
            label="New Password"
            text-input="px-4 py-3 rounded-md shadow-3xl xl:text-2xl md:text-xl text-lg"
            place-holder=""
            placeHolderClass="placeholder:text-lg"
            input-wrapper="inputWrapper"
            color="#8DB230"
            background="#E8EBED"
            place-holder-color="#656565"
            v-model.trim="$v1.newPassword.$model"
            :error="$v1.newPassword.$error"
            :error-message="$v1.newPassword.$errors"
          >
            <template v-slot:icon-after>
              <div
                class="flex items-center h-[50px] self-end absolute right-3"
                @click="showNewPassword = !showNewPassword"
              >
                <ClientOnly>
                  <BaseIconEyeSlashIcon
                    v-if="showNewPassword"
                    class="text-black"
                  />
                  <BaseIconEyeIcon v-else class="text-black" /> </ClientOnly
                > 
              </div>
            </template>
          </BaseInputText>

          <BaseInputText
            id="confirmPassword"
            class="h-[50px] max-w-[424px] relative"
            name="confirmPassword"
            :type="showConfirmPassword ? 'password' : 'text'"
            label="Confirm Password"
            text-input="px-4 py-3 rounded-md shadow-3xl xl:text-2xl md:text-xl text-lg"
            place-holder=""
            placeHolderClass="placeholder:text-lg"
            input-wrapper="inputWrapper"
            color="#8DB230"
            background="#E8EBED"
            place-holder-color="#656565"
            v-model.trim="$v1.confirmPassword.$model"
            :error="$v1.confirmPassword.$error"
            :error-message="$v1.confirmPassword.$errors"
          >
            <template v-slot:icon-after>
              <div
                class="flex items-center h-[50px] self-end absolute right-3"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <ClientOnly>
                  <BaseIconEyeSlashIcon
                    v-if="showConfirmPassword"
                    class="text-black"
                  />
                  <BaseIconEyeIcon v-else class="text-black" /> </ClientOnly
                > 
              </div>
            </template>
          </BaseInputText>
        </div>
      </Transition>
    </div>
    <div class="flex space-x-4 pt-5 mt-[40px]">
      <Transition name="globalFadeInFadeOut" mode="out-in">
        <BaseButton
          v-if="!hideEmailField"
          type="submit"
          text="Send Code"
          class="bg-[#8DB230] text-[#ffffff] py-2 whitespace-nowrap w-[180px] md:w-[200px] px-4 text-base md:text-xl font-semibold rounded-md"
          @click.stop="resendEmailVerifyCode({ email: changePassword.email })"
          :disabled="sendCodeProcess"
        />
      </Transition>
      <Transition name="FadeInFadeOut" mode="out-in">
        <div
          v-if="showPasswordField"
          class="flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4 delay-500"
        >
          <BaseButton
            type="submit"
            text="Save Changes"
            class="bg-[#8DB230] text-[#ffffff] py-2 whitespace-nowrap w-[200px] md:w-[236px] px-4 text-base md:text-xl font-semibold rounded-md"
            :disabled="passwordResetProcess"
            @click.stop="newPasswordReset()"
          />
          <BaseButton
            type="submit"
            text="Cancel"
            class="bg-[#E8EBED] text-[#8DB230] py-2 whitespace-nowrap w-[152px] md:w-[180px] px-4 text-base md:text-xl font-semibold rounded-md"
            @click.stop="resetAll()"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.FadeInFadeOut-enter-active,
.FadeInFadeOut-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.FadeInFadeOut-enter-active {
  transition-delay: 0.5s;
}
.FadeInFadeOut-enter-from,
.FadeInFadeOut-leave-to {
  opacity: 0;
}
</style>
