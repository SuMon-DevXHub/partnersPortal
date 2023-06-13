<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, email } from "@vuelidate/validators";
definePageMeta({
  title: "Contact",
});

// types
interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  postalCode: string;
  question: string;
}
// State
const personalInfo = ref<PersonalInformation>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "+1",
  dateOfBirth: "",
  address: "",
  postalCode: "",
  question: "",
});
const isProcessing = ref<boolean>(false);
const countryCode = ref("+1");
// Validations
const validations = computed(() => {
  return {
    firstName: { required, maxLength: maxLength(40) },
    lastName: { required, maxLength: maxLength(40) },
    email: { required, email },
    phone: { required },
    dateOfBirth: { required },
    address: { required },
    postalCode: { required },
    question: { required, maxLength: maxLength(500) },
  };
});
const $v = useVuelidate(validations, personalInfo);
const currentPhonePlaceholder = computed(() => {
  return countryCode.value === "+1" ? "###-###-####" : "####-######";
});
// Methods
const countryCodeEvent = (value: any) => {
  countryCode.value = value;
};
const submitForm = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    console.log("form is invalid");
    return;
  }
  console.log("form is valid");
};
</script>

<template>
  <section>
    <div class="h-full">
      <div
        class="flex flex-wrap flex-col lg:flex-row contact-wrapper lg:space-x-14 text-lg md:text-xl lg:text-2xl mt-6 md:mt-22 w-full"
      >
        <div class="w-full md:flex-grow mt-12 lg:mt-0">
          <form
            class="flex flex-col space-y-6 md:space-y-7 w-full h-full lg:items-start items-center"
            novalidate
            @submit.prevent="submitForm"
          >
            <div
              class="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-4"
            >
              <BaseInputText
                id="firstName"
                class="w-full md:w-1/2"
                name="firstName"
                type="text"
                label="First Name"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder="Write your name"
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                v-model.trim="$v.firstName.$model"
                :error="$v.firstName.$error"
                :error-message="$v.firstName.$errors"
              />
              <BaseInputText
                id="lastName"
                class="w-full md:w-1/2"
                name="lastName"
                type="text"
                label="Last Name"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder="Write your name"
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                v-model.trim="$v.lastName.$model"
                :error="$v.lastName.$error"
                :error-message="$v.lastName.$errors"
              />
            </div>

            <div
              class="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-4"
            >
              <BaseInputText
                id="email"
                class="w-full md:w-1/2"
                name="email"
                type="email"
                label="Email Address"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder="Write your email address"
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                v-model.trim="$v.email.$model"
                :error="$v.email.$error"
                :error-message="$v.email.$errors"
              />

              <!-- Phone Number Input -->
              <div class="w-full md:w-1/2">
                <label for="phoneNumber" class="font-medium text-[#8DB230]"
                  >Phone</label
                >
                <ClientOnly>
                  <BaseInputPhoneNumberInput
                    :id="'phoneNumber'"
                    v-model.trim="$v.phone.$model"
                    :default-country-code="countryCode"
                    color="#656565"
                    class="phoneNumberInputPartner"
                    :place-holder="currentPhonePlaceholder"
                    background="#D1D5DB"
                    input-classes="placeholder-gray-1200 placeholder-opacity-50
                    text-gray-1200 bg-gray-1100 py-3 px-4 customPhoneInputClass h-10 md:h-14"
                    @countryCode="countryCodeEvent"
                  ></BaseInputPhoneNumberInput>
                </ClientOnly>
                <template v-if="$v.phone.$error">
                  <p
                    v-if="$v.phone.required.$invalid"
                    class="text-red-500 text-xs"
                  >
                    Phone is Required
                  </p>
                </template>
              </div>
            </div>

            <div
              class="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-4"
            >
              <BaseInputText
                id="dateOfBirth"
                class="w-full md:w-1/2"
                name="dateOfBirth"
                type="dateOfBirth"
                label="Date of Birth"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder="Write your Date of Birth"
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                v-model.trim="$v.dateOfBirth.$model"
                :error="$v.dateOfBirth.$error"
                :error-message="$v.dateOfBirth.$errors"
              />

              <div class="text-[#8DB230] w-full md:w-1/2 flex flex-col">
                <div>Gender</div>
                <div class="flex flex-grow space-x-8 items-center">
                  <div class="flex items-center">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-6 h-6 text-[#8DB230] bg-gray-100 border-gray-300 dark:ring-[#8DB230] dark:bg-[#8DB230] dark:border-[#8DB230]"
                    />
                    <label
                      for="default-radio-1"
                      class="ml-2 text-sm font-medium text-[#656565] dark:text-gray-300"
                      >Male</label
                    >
                  </div>
                  <div class="flex items-center">
                    <input
                      checked
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-6 h-6 text-[#8DB230] bg-gray-100 border-gray-300 dark:ring-[#8DB230] dark:bg-[#8DB230] dark:border-[#8DB230]"
                    />
                    <label
                      for="default-radio-2"
                      class="ml-2 text-sm font-medium text-[#656565] dark:text-gray-300"
                      >Female</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-4"
            >
              <BaseInputText
                id="address"
                class="w-full md:w-1/2"
                name="address"
                type="text"
                label="Address"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder="Write your address"
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                v-model.trim="$v.address.$model"
                :error="$v.address.$error"
                :error-message="$v.address.$errors"
              />
              <BaseInputText
                id="postalCode"
                class="w-full md:w-1/2"
                name="postalCode"
                type="text"
                label="Postal Code"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder="Your postal code"
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                v-model.trim="$v.postalCode.$model"
                :error="$v.postalCode.$error"
                :error-message="$v.postalCode.$errors"
              />
            </div>

            <div class="flex space-x-4 py-10 md:py-0 md:pt-20">
              <BaseButton
                type="submit"
                text="Save Changes"
                class="bg-[#8DB230] text-[#ffffff] py-2 whitespace-nowrap w-[152px] md:w-[180px] px-4 text-base md:text-xl font-semibold rounded-md"
                :disabled="isProcessing"
              />
              <BaseButton
                type="submit"
                text="Cancel"
                class="bg-[#E8EBED] text-[#8DB230] py-2 whitespace-nowrap w-[152px] md:w-[180px] px-4 text-base md:text-xl font-semibold rounded-md"
                :disabled="isProcessing"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/personalInformation.scss";
</style>
