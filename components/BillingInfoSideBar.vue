<template>
  <transition name="slideInOut">
    <div
      v-if="showBillingInfomModal"
      class="h-full z-[100] absolute payment top-0 right-0 bg-[#222831] md:p-[30px] p-4 md:pt-12 transition-all duration-800 ease-in-out overflow-y-auto scroll md:rounded-l-2xl"
      :class="showBillingInfomModal ? 'md:shadow-2xl' : ''"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <div class="flex flex-row justify-between items-center">
            <h2
              class="text-orange-midlight xl:text-2xl md:text-xl text-2xl md:font-bold"
            >
              Change Billing Information
            </h2>
            <div
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="closeBillingInfoModal()"
            >
              <ClientOnly>
                <fa
                  class="text-orange-midlight xl:text-2xl md:text-xl text-2xl md:font-bold font-normal"
                  :icon="['fas', 'times']"
                />
              </ClientOnly>
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="mt-5 mb-2">
              <label
                v-if="storeCardInfo.brand !== 'PayPal'"
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="holder_name"
                >Credit Card Name</label
              >
              <label
                v-else
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="holder_name"
                >Name</label
              >
              <input
                id="holder_name"
                v-model="creditCardName"
                class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type="text"
                name="holdername"
                placeholder="Mr John Smith"
                @blur="v1$.creditCardName.$touch()"
              />
              <template v-if="v1$.creditCardName.$error">
                <p class="text-red-500 text-xs mb-0 pl-2">
                  <span
                    v-for="error in v1$.creditCardName.$errors"
                    :key="error.$uid"
                  >
                    {{ errorMessages(error, creditCardName) }}
                  </span>
                </p>
              </template>
            </div>
            <div
              v-if="storeCardInfo.brand !== 'PayPal'"
              class="flex flex-row gap-2 justify-around mb-2"
            >
              <div class="w-full">
                <label
                  class="block font-normal md:text-xl text-md text-gray-1100"
                  for="card_number"
                  >Expiration</label
                >
                <input
                  id="expire_date"
                  v-maska
                  data-maska="## / ####"
                  v-model="expDate"
                  maxlength="9"
                  class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                  type
                  name="expiredate"
                  placeholder="03/2024"
                />
              </div>
            </div>
            <div class="mb-2">
              <label
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="addressLine1"
                >Address Line1</label
              >
              <input
                id="addressLine1"
                v-model="storeCardInfo.addressLine1"
                class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type="text"
                name="holdername"
                placeholder="Street address/PO Box/Company name"
                @blur="v$.addressLine1.$touch()"
              />
              <template v-if="v$.addressLine1.$error">
                <p class="text-red-500 text-xs mb-0 pl-2">
                  <span
                    v-for="error in v$.addressLine1.$errors"
                    :key="error.$uid"
                  >
                    {{ errorMessages(error, storeCardInfo.addressLine1) }}
                  </span>
                </p>
              </template>
            </div>
            <div class="mb-2">
              <label
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="addressLine2"
                >Address Line2</label
              >
              <input
                id="addressLine2"
                v-model="storeCardInfo.addressLine2"
                class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type="text"
                name="holdername"
                placeholder="Apartment/Suite/Unit/Building"
                @blur="v$.addressLine2.$touch()"
              />
              <template v-if="v$.addressLine2.$error">
                <p class="text-red-500 text-xs mb-0 pl-2">
                  <span
                    v-for="error in v$.addressLine2.$errors"
                    :key="error.$uid"
                  >
                    {{ errorMessages(error, storeCardInfo.addressLine2) }}
                  </span>
                </p>
              </template>
            </div>
            <div class="flex flex-row space-x-2 justify-around mb-2">
              <div class="w-1/2">
                <label
                  class="block font-normal md:text-xl text-md text-gray-1100"
                  for="addressCity"
                  >City</label
                >
                <input
                  id="addressCity"
                  v-model="storeCardInfo.addressCity"
                  class="w-full h-9 mt-1 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                  type
                  name="addressCity"
                  placeholder="City/District/Suburb"
                  @keydown="preventSpecialCharacter($event)"
                  @blur="v$.addressCity.$touch()"
                />
                <template v-if="v$.addressCity.$error">
                  <p class="text-red-500 text-xs mb-0 pl-2">
                    <span
                      v-for="error in v$.addressCity.$errors"
                      :key="error.$uid"
                    >
                      {{ errorMessages(error, storeCardInfo.addressCity) }}
                    </span>
                  </p>
                </template>
              </div>
              <div class="w-1/2">
                <label
                  class="block font-normal md:text-xl text-md text-gray-1100"
                  for="State"
                  >State</label
                >
                <input
                  id="state"
                  v-model="storeCardInfo.addressState"
                  class="w-full h-9 mt-1 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                  type
                  name="State"
                  placeholder="State/Country/Province"
                  @blur="v$.addressState.$touch()"
                />
                <template v-if="v$.addressState.$error">
                  <p class="text-red-500 text-xs mb-0 pl-2">
                    <span
                      v-for="error in v$.addressState.$errors"
                      :key="error.$uid"
                    >
                      {{ errorMessages(error, storeCardInfo.addressState) }}
                    </span>
                  </p>
                </template>
              </div>
            </div>
            <div class="mb-2">
              <label
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="addressLine2"
                >Country</label
              >
              <input
                id="addressCountry"
                v-model="storeCardInfo.addressCountry"
                class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type="text"
                name="addressCountry"
                placeholder="Address Country"
                @blur="v$.addressCountry.$touch()"
              />
              <template v-if="v$.addressCountry.$error">
                <p class="text-red-500 text-xs mb-0 pl-2">
                  <span
                    v-for="error in v$.addressCountry.$errors"
                    :key="error.$uid"
                  >
                    {{ errorMessages(error, storeCardInfo.addressState) }}
                  </span>
                </p>
              </template>
            </div>
            <div class="flex flex-row justify-start mb-5">
              <div class="w-1/2">
                <label
                  class="block font-normal md:text-xl text-md text-gray-1100"
                  for="addressZip"
                  >Zip Code</label
                >
                <input
                  id="addressZip"
                  v-model="storeCardInfo.addressZip"
                  class="w-full h-9 mt-1 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                  type="text"
                  name="addressZip"
                  placeholder="ZIP or postal code"
                  @blur="v$.addressZip.$touch()"
                />
                <template v-if="v$.addressZip.$error">
                  <p
                    v-if="
                      v$.addressZip.minLength.$invalid ||
                      v$.addressZip.maxLength.$invalid ||
                      v$.addressZip.numeric.$invalid
                    "
                    class="text-red-600 text-xs"
                  >
                    ZipCode is invalid!
                  </p>
                </template>
              </div>
            </div>
            <div class>
              <label class="inline-flex items-center">
                <input
                  v-model="acceptTerms"
                  type="checkbox"
                  class="form-checkbox w-5 h-5 text-orange-midlight"
                />
                <span class="ml-2 text-md text-white">
                  Accept
                  <NuxtLink
                    class="underline font-bold"
                    to="/terms-of-service"
                    rel="noopener noreferrer"
                    target="_blank"
                    >Terms of Service</NuxtLink
                  >
                  and
                  <NuxtLink
                    class="underline font-bold"
                    to="/privacy-policy"
                    rel="noopener noreferrer"
                    target="_blank"
                    >Privacy Policy</NuxtLink
                  >
                </span>
              </label>
            </div>

            <div class="flex flex-row justify-between">
              <p class="md:text-lg text-base text-gray-1100 float-left pt-5">
                Save as default payment method
              </p>

              <div
                class="md:w-37 w-[150px] md:h-10 h-8 mt-4 relative float-right rounded-full yes_no"
              >
                <input
                  v-model="storeCardInfo.isDefault"
                  type="checkbox"
                  class="checkbox h-full"
                  @click="toggle"
                />
                <div :class="checked ? 'yes' : 'yes1'">Yes</div>
                <div :class="!checked ? 'no' : 'no1'">No</div>
                <div :class="checked ? 'text' : 'text1'"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full text-center md:mt-0 mt-14 md:pb-0 pb-4 save-button">
          <button
            class="w-44 py-2 text-white bg-orange-midlight rounded-full border-none outline-none font-bold setup md:text-md text-lg"
            :disabled="saveProcess"
            @click="
              storeCardInfo.brand !== 'PayPal'
                ? orderButton()
                : orderWithPayPal()
            "
          >
            <div class="rounded-full relative flex items-center justify-around">
              <span>Save</span>
              <ClientOnly>
                <fa
                  v-if="saveProcess"
                  class="absolute right-5 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </ClientOnly>
            </div>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CARDINFO, PAYPAL_PAYMENT } from "~/constants/urls";
import { useFetched } from "~/composables/useFetched";
import { useInputValidations } from "~/composables/useValidations";
import { storeToRefs } from "pinia";
import { usePaymentStore } from "~/stores/payment";

const nuxtApp = useNuxtApp();
const { countryFirstTwoCharacter, errorMessages } = useInputValidations();
const { showBillingInfomModal, singleBillingInfo } =
  storeToRefs(usePaymentStore());
const { setShowBillingInfoModal, getBillingInfo } =
  usePaymentStore();
const creditCardName = ref("");
const storeCardInfo = ref({
  addressLine1: "",
});
const rules = {
  addressLine1: {
    required,
    maxLength: maxLength(30),
  },
  addressLine2: {
    maxLength: maxLength(30),
  },
  addressCountry: {
    maxLength: maxLength(30),
    countryFirstTwoCharacter,
  },
  addressCity: {
    maxLength: maxLength(30),
  },
  addressState: {
    maxLength: maxLength(30),
  },
  addressZip: {
    minLength: minLength(4),
    maxLength: maxLength(6),
    numeric,
  },
};
const rules1 = {
  creditCardName: {
    required,
    maxLength: maxLength(40),
  },
};
const v$ = useVuelidate(rules, storeCardInfo);
const v1$ = useVuelidate(rules1, { creditCardName });
const { fetch } = useFetched();
const checked = ref(false);
const defaultInfo = ref({});
const expDate = ref("");
const acceptTerms = ref(true);
const saveProcess = ref(false);
// methods
const getSingleInfo = () => {
  checked.value = singleBillingInfo.value.isDefault;
  storeCardInfo.value = singleBillingInfo.value;
  creditCardName.value = storeCardInfo.value.name;
  expDate.value =
    storeCardInfo.value.expMonth + " / " + storeCardInfo.value.expYear;
  defaultInfo.value = Object.assign({}, storeCardInfo.value);
  if (expDate.value.length === 8) {
    expDate.value = "0" + expDate.value;
  }
};
const preventSpecialCharacter = (e) => {
  if (/^\W$/.test(e.key) && e.key !== " ") {
    e.preventDefault();
  }
};
const setExpDate = (data) => {
  storeCardInfo.value.expMonth = data.substring(0, 2);
  storeCardInfo.value.expYear = data.slice(-4);
};
const closeBillingInfoModal = () => {
  hideBlog();
  setShowBillingInfoModal(false);
};
const hideBlog = () => {
  storeCardInfo.value = Object.assign({}, defaultInfo.value);
  setShowBillingInfoModal(false);
  v$.value.$reset();
};
const toggle = () => {
  checked.value = !checked.value;
};
const orderButton = async () => {
  nuxtApp.$toast("clear");
  if (!acceptTerms.value) {
    nuxtApp.$toast("error", {
      message: "Please Accept Terms of Service and Privacy Policy",
      className: "toasted-bg-alert",
    });
    return false;
  }
  const checkString = expDate.value.substring(1, 2);
  v$.value.$touch();
  v1$.value.$touch();
  if (
    !v$.value.$invalid &&
    !v1$.value.$invalid &&
    checkString !== " " &&
    checkString !== "/"
  ) {
    try {
      saveProcess.value = true;
      setExpDate(expDate.value);
      storeCardInfo.value.name = creditCardName.value;
      storeCardInfo.value.isOwner = true;
      const response = await fetch(CARDINFO, {
        method: "PUT",
        body: storeCardInfo.value,
      });
      if (response.success) {
        nuxtApp.$toast("success", {
          message: response.message,
          className: "toasted-bg-archive",
        });
        defaultInfo.value = Object.assign({}, response.data);
        hideBlog();
        getBillingInfo();
      } else {
        nuxtApp.$toast("error", {
          message: response.message,
          className: "toasted-bg-alert",
        });
      }
      saveProcess.value = false;
    } catch (err) {
      saveProcess.value = false;
      console.log(err);
    }
  } else if ((checkString === " ") | (checkString === "/")) {
    nuxtApp.$toast("error", {
      message: "Please Enter two digit value for Expiration Month",
      className: "toasted-bg-alert",
    });
  }
};
const orderWithPayPal = async () => {
  nuxtApp.$toast("clear");
  if (!acceptTerms.value) {
    nuxtApp.$toast("error", {
      message: "Please Accept Terms of Service and Privacy Policy",
      className: "toasted-bg-alert",
    });
    return false;
  }
  v$.value.$touch();
  v1$.value.$touch();
  if (!v$.value.$invalid && !v1$.value.$invalid) {
    try {
      saveProcess.value = true;
      storeCardInfo.value.name = creditCardName.value;
      storeCardInfo.value.isOwner = true;
      const response = await fetch(PAYPAL_PAYMENT, {
        method: "PUT",
        body: storeCardInfo.value,
      });
      if (response.success) {
        nuxtApp.$toast("success", {
          message: response.message,
          className: "toasted-bg-archive",
        });
        defaultInfo.value = Object.assign({}, response.data);
        hideBlog();
        getBillingInfo();
      } else {
        nuxtApp.$toast("error", {
          message: response.message,
          className: "toasted-bg-alert",
        });
      }
      saveProcess.value = false;
    } catch (err) {
      saveProcess.value = false;
    }
  }
};
// watch properties
watch(singleBillingInfo, (data) => {
  if (data) {
    getSingleInfo();
    acceptTerms.value = true;
  }
});
watch(showBillingInfomModal, (data) => {
  if (data) {
    getSingleInfo();
  }
});
</script>

<style lang="scss" scoped>
.checkbox {
  @apply absolute top-0 left-0 w-full cursor-pointer z-[100] opacity-0;
}

.yes_no {
  background-color: #fff;
}

.yes {
  height: 2.5rem;
  width: 75px;
  top: 0.2rem;
  @apply absolute left-0 rounded-full text-white font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.yes1 {
  height: 2.5rem;
  width: 75px;
  top: 0.2rem;
  @apply absolute left-0 rounded-full text-orange-midlight font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.no {
  height: 2.5rem;
  width: 75px;
  left: 75px;
  top: 0.2rem;
  @apply absolute rounded-full text-white font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.no1 {
  height: 2.5rem;
  width: 75px;
  left: 75px;
  top: 0.2rem;
  @apply absolute rounded-full text-orange-midlight font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.text {
  height: 2.5rem;
  width: 75px;
  left: 0px;
  @apply absolute top-0 rounded-full bg-orange-midlight text-white font-bold text-center text-xl leading-8 transition-all duration-300 ease-in-out;
}

.text1 {
  height: 2.5rem;
  width: 75px;
  left: 75px;
  @apply absolute top-0 rounded-full bg-orange-midlight text-white font-medium text-center text-xl leading-8 transition-all duration-300 ease-in-out;
}

.payment {
  width: 500px;
  height: 100%;
  z-index: 9999;
}

/* for slideInOut */
.slideInOut-enter-active,
.slideInOut-leave-active {
  transition: all 0.8s ease-in-out;
}
.slideInOut-enter-from,
.slideInOut-leave-to {
  right: -100%;
}

.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

.payment-method {
  margin: 20px 60px;
}

button:focus {
  outline: none;
  border: none;
}

.paybutton-leave-active {
  transition: opacity 3s;
}

.paybutton-leave-to {
  opacity: 0;
}

.paymentform-leave-active {
  transition: opacity 2s;
}

.paymentform-leave-to {
  opacity: 0;
}

.orderbutton-leave-active {
  transition: opacity 2s;
}

.orderbutton-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .payment {
    position: fixed;
    width: 100%;
    height: 85%;
    border-radius: 0 0 1.563rem 1.563rem;
  }

  .show {
    width: 100%;
    right: 0px;
  }

  .hide {
    width: 100%;
    right: -100%;
  }

  .yes_no {
    background-color: #fff;
  }

  .yes {
    height: 2rem;
    width: 62px;
    @apply absolute top-0 left-0 rounded-full text-white font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .yes1 {
    height: 2rem;
    width: 62px;
    @apply absolute top-0 left-0 rounded-full text-orange-midlight font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .no {
    height: 2.25rem;
    width: 62px;
    left: 50px;
    @apply absolute top-0 rounded-full text-white font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .no1 {
    height: 2rem;
    width: 62px;
    left: 50px;
    @apply absolute top-0 rounded-full text-orange-midlight font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .text {
    height: 2rem;
    width: 62px;
    left: 0px;
    @apply absolute top-0 rounded-full bg-orange-midlight text-white font-bold text-center text-sm leading-8 transition-all duration-300 ease-in-out;
  }
  .text1 {
    height: 2rem;
    width: 62px;
    left: 50px;
    @apply absolute top-0 rounded-full bg-orange-midlight text-white font-bold text-center text-sm leading-8 transition-all duration-300 ease-in-out;
  }
}
@media (max-height: 850px) {
  .save-button {
    @apply mt-14 pb-4;
  }
}
</style>
