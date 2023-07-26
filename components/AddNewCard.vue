<script setup>
import { required, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CARDINFO, PAYPAL_PAYMENT, USER_PROFILE } from "~/constants/urls";
import { useHideText } from "~/composables/useHideText";
import { useInputValidations } from "~/composables/useValidations";
import { useFetched } from "~/composables/useFetched";
import { storeToRefs } from "pinia";
import { usePaymentStore } from "~/stores/payment";
import { useAuth } from "~/composables/useAuth";
import { useProfileStore } from "~/stores/the-profile";

const { userInfo } = useAuth();
const { showPaymentModal } = storeToRefs(usePaymentStore());
const { setShowPaymentModal, getBillingInfo } = usePaymentStore();
const { hideText } = useHideText();
const nuxtApp = useNuxtApp();
const $config = useRuntimeConfig();
const { errorMessages } = useInputValidations();
const billingAddress = ref("");
const rules = {
  billingAddress: {
    required,
    maxLength: maxLength(60),
  },
};
const { setProfileInfo } = useProfileStore();
const v$ = useVuelidate(rules, { billingAddress });
const { fetch } = useFetched();
const checked = ref(false);
const isDefault = ref(false);
const newCardInfo = ref(false);
const addProcess = ref(false);
const showPaymentOption = ref(true);
const billingWithCreditCard = ref(false);
const autoComplete = ref("");
const defaultTimeZone = ref("America/New_York");
const lat = ref("");
const long = ref("");
const showChangeBilling = computed(() => showPaymentModal.value);

const loadeded = (data) => {
  console.log("loaded: ", data);
};
const loadedError = (data) => {
  console.log("loadedError: ", data);
};
const paymentError = (data) => {
  console.log("paymentError: ", data);
};
const paymentSuccess = (data) => {
  console.log("paymentSuccess: ", data);
};
const origin = ref(null);
const checkoutRef = ref("");

const selectPaymentOption = async (currentPayMethod) => {
  const inputValue = document.getElementById("autoComplete");
  billingAddress.value = inputValue.value;
  if (currentPayMethod === "PayWithPayPal") {
    // this.$store.commit('setting/SET_BILLING_INFO', false)
    try {
      const { success, url, message } = await fetch(PAYPAL_PAYMENT, {
        method: "POST",
        body: {
          address: inputValue.value,
          successUrl: `${$config.public.siteUrl}/settings/account/?success`,
          cancelUrl: `${$config.public.siteUrl}/settings/account/?cancel`,
          failedUrl: `${$config.public.siteUrl}/settings/account/?failed`,
        },
      });
      if (success) {
        window.location.href = url;
        if (userInfo.value.paymentStatus === "") {
          const data = await fetch(USER_PROFILE);
          if (data) {
            userInfo.value = data.data;
            setProfileInfo(userInfo.value);
          }
        }
      } else {
        nuxtApp.$toast("error", {
          message: message,
          className: "toasted-bg-alert",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
const tokenCreated = async (token) => {
  if (
    !billingAddress.value &&
    token.card.address_country &&
    token.card.address_state &&
    token.card.address_city &&
    token.card.country &&
    token.card.address_zip
  ) {
    billingAddress.value =
      token.card.address_country +
      ", " +
      token.card.address_state +
      ", " +
      token.card.address_city +
      ", " +
      token.card.country +
      ", " +
      token.card.address_zip;
  }
  nuxtApp.$toast("clear");
  if (token && billingAddress.value && !v$.value.$invalid) {
    try {
      addProcess.value = true;
      const res = await fetch(CARDINFO, {
        method: "POST",
        body: {
          token: token?.id,
          address: billingAddress.value,
          isDefault: isDefault.value,
          defaultTimeZone: defaultTimeZone.value,
        },
      });
      if (res.success) {
        addProcess.value = false;
        nuxtApp.$toast("success", {
          message: res.message,
          className: "toasted-bg-archive",
        });
        if (userInfo.value.paymentStatus === "") {
          const data = await fetch(USER_PROFILE);
          if (data) {
            userInfo.value = data.data;
            setProfileInfo(userInfo.value);
            getBillingInfo();
          }
        }
        setShowPaymentModal(false);
        // this.$store.dispatch("header/setCard");
        closeChangeBilling();
      } else {
        addProcess.value = false;
        nuxtApp.$toast("error", {
          message: res.message,
          className: "toasted-bg-alert",
        });
      }
    } catch (error) {
      addProcess.value = false;
    } finally {
      addProcess.value = false;
    }
  }
};
const checkout = () => {
  const inputValue = document.getElementById("autoComplete");
  billingAddress.value = inputValue.value;
  if (!addProcess.value) {
    if (!checkoutRef.value.error && !v$.value.$invalid) {
      addProcess.value = true;
    }
    checkoutRef.value.pay();
    setTimeout(() => {
      if (checkoutRef.value.token) {
        tokenCreated(checkoutRef.value.token);
      }
    }, 800);
  }
  setTimeout(() => {
    billingWithCreditCard.value = false;
    billingWithCreditCard.value = false;
    showPaymentOption.value = true;
    hideBlog();
  }, 5000);
};
const closeChangeBilling = () => {
  hideOverlay();
  setShowPaymentModal(false);
  addProcess.value = false;
  checkoutRef.value.clearCard();
  setTimeout(() => {
    billingAddress.value = "";
  }, 500);
  v$.value.$reset();
};
const closeBillingWithCreditCard = () => {
  billingWithCreditCard.value = false;
  setTimeout(() => {
    showPaymentOption.value = true;
  }, 500);
  hideOverlay();
  addProcess.value = false;
  checkoutRef.value.clearCard();
  billingAddress.value = "";
  v$.value.$reset();
};
const hideOverlay = () => {
  // this.$store.dispatch("header/removeOverlay");
};
const hideBlog = () => {
  billingAddress.value = "";
  // this.$store.dispatch('header/removeCard')
  hideOverlay();
  v$.value.$reset();
};

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
      billingAddress.value = originAutocomplete.getPlace().formatted_address;
    });
  }, 1000);
});

watch(
  () => showChangeBilling,
  (value) => {
    if (value.value) {
      setTimeout(() => {
        checkoutRef.value.clearCard();
        billingAddress.value = "";
        if (value.value) {
          addProcess.value = false;
          v$.value.$reset();
        }
      });
    } else {
      billingAddress.value = "";
      if (value.value) {
        addProcess.value = false;
        v$.value.$reset();
      }
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <Transition name="slideInOut">
    <div
      v-show="showChangeBilling"
      class="h-full z-100 fixed payment top-0 right-0 bg-[#222831] md:p-[30px] p-4 md:pt-12 transition-all duration-800 ease-in-out scroll md:rounded-l-2xl"
      :class="showChangeBilling ? 'md:shadow-2xl' : ''"
    >
      <div class="h-full flex flex-wrap content-between">
        <transition name="fadeIn">
          <div v-if="showPaymentOption" class="w-full">
            <div class="flex flex-row justify-between items-center">
              <h2
                class="text-orange-midlight xl:text-2xl md:text-xl text-2xl md:font-bold"
              >
                Payment Option
              </h2>
              <div
                class="w-8 h-8 flex items-center justify-end cursor-pointer"
                @click="closeChangeBilling()"
              >
                <ClientOnly>
                  <fa
                    class="text-orange-midlight xl:text-2xl md:text-xl text-2xl md:font-bold font-normal"
                    :icon="['fas', 'times']"
                  />
                </ClientOnly>
              </div>
            </div>

            <div class="flex flex-col space-y-4">
              <div class="flex flex-col w-full h-full mt-6">
                <input
                  id="autoComplete"
                  ref="origin"
                  v-model="billingAddress"
                  class="billing_address outline-none px-4 rounded-full bg-white w-full h-10 font-normal text-ash-1200 placeholder-gray-1800"
                  type="text"
                  placeHolder="Billing Address"
                  @blur="v$.billingAddress.$touch()"
                />
                <template v-if="v$.billingAddress.$error">
                  <p
                    class="text-red-400 text-xs mb-0 pl-2"
                    v-for="error in v$.billingAddress.$errors"
                    :key="error.$uid"
                  >
                    {{ errorMessages(error, billingAddress) }}
                  </p>
                </template>
              </div>

              <client-only id="card-payment">
                <StripePayment ref="checkoutRef" />
              </client-only>

              <div
                v-if="hideText($config.workflow)"
                class="tab cursor-pointer rounded-full text-center md:px-4 px-3 pb-2 pt-2.5 bg-white h-12 w-full hidden"
                @click="selectPaymentOption('ACHDebitCard')"
              >
                <span
                  class="pointer-events-none text-lg font-bold text-gray-600"
                  >ACH Direct Debit</span
                >
              </div>

              <div
                class="tab cursor-pointer rounded-full text-center h-12 w-full relative bg-white overflow-hidden"
                @click="selectPaymentOption('PayWithPayPal')"
              >
                <BaseIconPayPal />
              </div>

              <div v-if="hideText($config.workflow)" class="hidden">
                <GooglePay
                  total-price="100"
                  @loaded="loadeded"
                  @loadedError="loadedError"
                  @paymentError="paymentError"
                  @paymentSuccess="paymentSuccess"
                />
              </div>
            </div>
          </div>
        </transition>
        <transition name="fadeIn">
          <div v-if="billingWithCreditCard" class="w-full">
            <div class="flex flex-row justify-between items-center">
              <h2
                class="text-orange-midlight xl:text-2xl md:text-xl text-2xl md:font-bold"
              >
                Billing Information
              </h2>
              <div
                class="w-8 h-8 flex items-center justify-end cursor-pointer"
                @click="closeBillingWithCreditCard()"
              >
                <ClientOnly>
                  <fa
                    class="text-orange-midlight xl:text-2xl md:text-xl text-2xl md:font-bold font-normal"
                    :icon="['fas', 'times']"
                  />
                </ClientOnly>
              </div>
            </div>

            <div class="flex flex-col w-full h-full mt-6">
              <client-only id="card-payment">
                <StripePayment ref="checkoutRef" />
              </client-only>
              <div class="card-header">
                <h3>Billing Address</h3>
              </div>
              <input
                id="autoComplete"
                ref="origin"
                v-model="billingAddress"
                class="billing_address outline-none px-4 rounded-full bg-white w-full h-10 font-normal text-ash-1200 placeholder-gray-1800"
                type="text"
                placeHolder="Billing Address"
                @blur="v$.billingAddress.$touch()"
              />
              <template v-if="v$.billingAddress.$error">
                <p
                  class="text-red-400 text-xs mb-0 pl-2"
                  v-for="error in v$.billingAddress.$errors"
                  :key="error.$uid"
                >
                  {{ errorMessages(error, billingAddress) }}
                </p>
              </template>
            </div>
          </div>
        </transition>

        <div class="w-full text-center md:mt-0 mt-14 md:pb-0 pb-4">
          <button
            class="w-44 py-2 text-white bg-orange-midlight rounded-full border-none outline-none font-bold setup md:text-md text-lg"
            :disabled="addProcess"
            @click="checkout"
          >
            <div class="rounded-full relative flex items-center justify-around">
              <span>Update</span>
              <ClientOnly>
                <fa
                  v-if="addProcess"
                  class="absolute right-5 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </ClientOnly>
            </div>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}
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
  z-index: 999;
}

/* for slideInOut */
.slideInOut-enter-from,
.slideInOut-leave-to {
  right: -100%;
}

.slideInOut-enter-to,
.slideInOut-leave {
  right: 0;
}

.slideInOut-enter-active {
  transition: all 0.5s ease-in-out;
}
.slideInOut-leave-active {
  transition: all 0.5s ease-in-out;
}

.scroll {
  scrollbar-color: #99762e #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #99762e;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #99762e;
  }
}
.card-header {
  @apply w-full md:mb-4 mb-4 text-orange-midlight font-bold;
}
.billing_address {
  box-shadow: 0 1px 3px 0 #e6ebf1;
}
@media (max-width: 767px) {
  .payment {
    width: 100%;
    height: 85%;
    border-radius: 0 0 1.563rem 1.563rem;
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
</style>
