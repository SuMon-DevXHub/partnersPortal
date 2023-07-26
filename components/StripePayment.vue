<script setup>
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { useSecurityStore } from '~/stores/auth/signup/security'
// pinia
// const { setStripeToken } = useSecurityStore()
// data or state
const config = useRuntimeConfig();
const stripeLoaded = ref(false);
const card = ref();
const elms = ref();
const token = ref();
const error = ref(false);
const instanceOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
});
const elementsOptions = ref({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
});
const cardOptions = ref({
  // https://stripe.com/docs/stripe.js#element-options
  style: {
    base: {
      iconColor: "#B0BCC8",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "14px",
      backgroundColor: "#FFFFFF",
      "::placeholder": {
        color: "#B0BCC8",
      },
    },
  },
  hidePostalCode: true,
});
onBeforeMount(() => {
  const stripePromise = loadStripe(config.public.stripeKey);
  stripePromise.then(() => {
    stripeLoaded.value = true;
  });
});
// methods
const getError = (event) => {
  let displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
    error.value = true;
  } else {
    displayError.textContent = "";
    error.value = false;
  }
};
// data or state
// methods
const pay = () => {
  // Get stripe element
  const cardElement = card.value.stripeElement;
  // Access instance methods, e.g. createToken()
  elms.value.instance.createToken(cardElement).then((result) => {
    // Handle result.error or result.token
    if (result.token) {
      token.value = result.token;
      // setStripeToken(result.token.id)
    }
  });
};
const clearCard = () => {
  card.value.stripeElement.clear();
};
defineExpose({ clearCard, pay, token, error, card });
</script>

<template>
  <div>
    <div class="bg-white px-4 py-3 h-10 rounded-full">
      <StripeElements
        v-if="stripeLoaded"
        v-slot="{ elements, instance }"
        ref="elms"
        class="rounded-full"
        :stripe-key="$config.public.stripeKey"
        :instance-options="instanceOptions"
        :elements-options="elementsOptions"
      >
        <StripeElement
          ref="card"
          class="rounded-full"
          :elements="elements"
          :options="cardOptions"
          @change="getError"
        />
      </StripeElements>
    </div>
    <span id="card-errors" class="error text-sm text-red-900"> </span>
  </div>
</template>
