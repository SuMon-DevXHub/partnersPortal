<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, email } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/the-profile";

// types
interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateJoined: string;
  gender: string;
  address: string;
  postalCode: string;
  avatar: any;
}
interface ImageProps {
  imageUpload: any;
}

const props = withDefaults(defineProps<ImageProps>(), {
  imageUpload: "",
});

// State
const { userInfo } = storeToRefs(useProfileStore());
const { setProfileInfo } = useProfileStore();
const { updateUserProfile } = useAuth();
const nuxtApp = useNuxtApp();

const personalInfo = shallowRef<PersonalInformation>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "+1",
  dateJoined: "",
  gender: "",
  address: "",
  postalCode: "",
  avatar: "",
});
const isProcessing = shallowRef<boolean>(false);
const countryCode = shallowRef("+1");
const radioOptions = shallowRef([
  {
    id: "male",
    radioValue: "Male",
  },
  {
    id: "female",
    radioValue: "Female",
  },
]);
// Validations
const validations = computed(() => {
  return {
    firstName: { required, maxLength: maxLength(40) },
    lastName: { required, maxLength: maxLength(40) },
    email: { required, email },
    phone: { required },
    dateJoined: { required },
    gender: { required },
    address: { required },
    postalCode: { required },
  };
});
const $v = useVuelidate(validations, personalInfo);
const currentPhonePlaceholder = computed(() => {
  return countryCode.value === "+1" ? "###-###-####" : "####-######";
});
const origin = shallowRef(null);
const personalAvatar = shallowRef("");
// Mounted
onMounted(() => {
  setTimeout(() => {
    const originAutocomplete = new window.google.maps.places.Autocomplete(
      origin.value,
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(43.0, -75.0)
        ),
      }
    );
    originAutocomplete.addListener("place_changed", () => {
      personalInfo.value.address =
        originAutocomplete.getPlace().formatted_address;
    });
  }, 1000);

  cancelUpdateProfile("initial");
});
defineExpose({ personalAvatar });
// Methods
const countryCodeEvent = (value: any) => {
  countryCode.value = value;
};
const dateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};
const submitForm = async () => {
  $v.value.$touch();
  if (!$v.value.$invalid) {
    isProcessing.value = true;
    personalInfo.value.phone = "+1" + personalInfo.value.phone;
    personalInfo.value.avatar = props.imageUpload;

    await updateUserProfile(personalInfo.value).then((res) => {
      nuxtApp.$toast("clear");
      console.log(res, "here the response");
      if (res.success) {
        isProcessing.value = false;
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        setProfileInfo(res.data);
        useAuth().userInfo.value = res.data;
      } else {
        isProcessing.value = false;
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
      }
    });

    return;
  }
};
const cancelUpdateProfile = (value: string) => {
  personalInfo.value =
    value === "cancel"
      ? useAuth().userInfo.value
      : userInfo.value
      ? userInfo.value
      : useAuth().userInfo.value;

  personalInfo.value.dateJoined = dateFormat(personalInfo.value.dateJoined);
  personalInfo.value.gender =
    personalInfo.value.gender !== "" ? personalInfo.value.gender : "Male";

  personalInfo.value.postalCode = personalInfo.value.address
    ? personalInfo.value.address?.split(",")[2]?.split(" ")[2]
    : "";

  personalAvatar.value = personalInfo.value.avatar;
};
const currentRadioValue = (radioValue) => {
  personalInfo.value.gender = radioValue;
};
watch(
  () => personalInfo.value.address,
  (value) => {
    personalInfo.value.postalCode = value?.split(",")[2]?.split(" ")[2];
  },
  {
    deep: true,
  }
);
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
                disabled
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
                    id="phone"
                    type="phone"
                    v-model="$v.phone.$model"
                    text-input="textInput px-4 py-2 rounded-lg"
                    input-wrapper="inputWrapper "
                    place-holder="xxx-xxx-xxxx"
                    class="phoneNumberInputPartner"
                    label="Phone"
                    color="#656565"
                    background="#e8ebed"
                    :error="$v.phone.$error"
                    :error-message="$v.phone.$errors"
                  />
                </ClientOnly>
              </div>
            </div>

            <div
              class="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-4"
            >
              <BaseInputText
                id="dateJoined"
                class="w-full md:w-1/2"
                name="dateJoined"
                type="dateJoined"
                label="Date of Joined"
                text-input="px-4 py-2 md:py-3 rounded-md shadow-3xl text-base md:text-lg lg:text-xl xl:text-2xl"
                place-holder=""
                placeHolderClass="placeholder:text-lg"
                input-wrapper="inputWrapper"
                color="#8DB230"
                background="#E8EBED"
                place-holder-color="#656565"
                disabled
                v-model.trim="$v.dateJoined.$model"
                :error="$v.dateJoined.$error"
                :error-message="$v.dateJoined.$errors"
              />

              <div class="text-[#8DB230] w-full md:w-1/2 flex flex-col">
                <div>Gender</div>
                <BaseInputCustomRadio
                  class="max-h-[40px] md:max-h-full md:flex-grow"
                  :radio-options="radioOptions"
                  @currentRadioValue="currentRadioValue"
                />
              </div>
            </div>

            <div
              class="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-4"
            >
              <div class="flex flex-col w-full md:w-1/2">
                <label for="address" class="font-medium text-[#8DB230] mb-1.5"
                  >Address</label
                >
                <input
                  id="address"
                  ref="origin"
                  class="w-full flex-grow bg-[#E8EBED] rounded-md px-4 py-2 md:py-3 text-[#8DB230] text-base md:text-lg lg:text-xl xl:text-2xl"
                  name="address"
                  type="text"
                  label="Address"
                  text-input=" rounded-md shadow-3xl"
                  place-holder="Write your address"
                  placeHolderClass="placeholder:text-lg"
                  input-wrapper="inputWrapper"
                  color="#8DB230"
                  place-holder-color="#656565"
                  v-model.trim="$v.address.$model"
                  :error="$v.address.$error"
                  :error-message="$v.address.$errors"
                />
              </div>
              <BaseInputText
                id="postalCode"
                class="w-full md:w-1/2"
                name="postalCode"
                type="text"
                label="Postal Code"
                disabled
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
                :class="isProcessing ? '!justify-between' : ''"
                :disabled="isProcessing"
              />
              <BaseButton
                type="button"
                text="Cancel"
                class="bg-[#E8EBED] text-[#8DB230] py-2 whitespace-nowrap w-[152px] md:w-[180px] px-4 text-base md:text-xl font-semibold rounded-md"
                @click="cancelUpdateProfile('cancel')"
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
