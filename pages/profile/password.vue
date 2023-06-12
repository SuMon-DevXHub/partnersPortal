<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, email } from "@vuelidate/validators";

// types
interface PersonalInformation {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
// State
const changePassword = ref<PersonalInformation>({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
// Validations
const validations = computed(() => {
  return {
    currentPassword: { required },
    newPassword: { required },
    confirmPassword: { required },
  };
});
const $v = useVuelidate(validations, changePassword);
</script>

<template>
  <div class="px-4 md:px-[8%]">
    <h2 class="text-[#8DB230] text-lg py-[30px]">Change your password</h2>

    <div class="flex flex-col space-y-16">
      <BaseInputText
        id="currentPassword"
        class="h-[50px] max-w-[424px]"
        name="currentPassword"
        type="password"
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
      />
      <BaseInputText
        id="newPassword"
        class="h-[50px] max-w-[424px]"
        name="newPassword"
        type="password"
        label="New Password"
        text-input="px-4 py-3 rounded-md shadow-3xl xl:text-2xl md:text-xl text-lg"
        place-holder=""
        placeHolderClass="placeholder:text-lg"
        input-wrapper="inputWrapper"
        color="#8DB230"
        background="#E8EBED"
        place-holder-color="#656565"
        v-model.trim="$v.newPassword.$model"
        :error="$v.newPassword.$error"
        :error-message="$v.newPassword.$errors"
      />
      <BaseInputText
        id="confirmPassword"
        class="h-[50px] max-w-[424px]"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        text-input="px-4 py-3 rounded-md shadow-3xl xl:text-2xl md:text-xl text-lg"
        place-holder=""
        placeHolderClass="placeholder:text-lg"
        input-wrapper="inputWrapper"
        color="#8DB230"
        background="#E8EBED"
        place-holder-color="#656565"
        v-model.trim="$v.confirmPassword.$model"
        :error="$v.confirmPassword.$error"
        :error-message="$v.confirmPassword.$errors"
      />

      <div class="flex space-x-4">
        <BaseButton
          type="submit"
          text="Save Changes"
          class="bg-[#8DB230] text-[#ffffff] py-2 w-[180px] px-4 lg:mt-0 mt-10 text-xl font-semibold rounded-md"
        />
        <BaseButton
          type="submit"
          text="Cancel"
          class="bg-[#E8EBED] text-[#8DB230] py-2 w-[180px] px-4 lg:mt-0 mt-10 text-xl font-semibold rounded-md"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
