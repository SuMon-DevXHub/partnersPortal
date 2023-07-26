<template>
  <div class="example">
    <div
      ref="googlePay"
      class="tab cursor-pointer rounded-full text-center bg-white md:px-1 px-1 py-1.5 h-12 overflow-hidden w-full relative"
    >
      <img
        class="mx-auto pointer-events-none googlePayIcon pt-0.5"
        :src="googlePayIcon"
        alt="SharpArchive googlePayIcon Icon"
      />
    </div>
  </div>
</template>
<script>
import GooglePayIcon from '~/assets/img/icon/google-pay.svg'
export default {
  name: 'GooglePay',
  props: {
    totalPrice: {
      type: String,
      default: '0.00',
      required: true,
    },
  },
  data: () => ({
    googlePayIcon: GooglePayIcon,
    config: {
      baseRequest: {
        apiVersion: 2,
        apiVersionMinor: 0,
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'BCR2DN4TRTNIPXBD',
        },
      },
      allowedCardNetworks: [
        'AMEX',
        'DISCOVER',
        'INTERAC',
        'JCB',
        'MASTERCARD',
        'VISA',
      ],
      allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    },
  }),
  computed: {},
  mounted() {
    // setTimeout(() => this.loadGooglePay(), 2000)
  },
  methods: {
    loadGooglePay() {
      const baseCardPaymentMethod = {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: this.config.allowedCardAuthMethods,
          allowedCardNetworks: this.config.allowedCardNetworks,
        },
      }
      const cardPaymentMethod = Object.assign({}, baseCardPaymentMethod, {
        tokenizationSpecification: this.config.tokenizationSpecification,
      })
      let paymentsClient = null

      const getGoogleIsReadyToPayRequest = () => {
        return Object.assign({}, this.config.baseRequest, {
          allowedPaymentMethods: [baseCardPaymentMethod],
        })
      }

      const getGooglePaymentDataRequest = () => {
        const paymentDataRequest = Object.assign({}, this.config.baseRequest)
        paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod]
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo()
        paymentDataRequest.merchantInfo = {
          // @todo a merchant ID is available for a production environment after approval by Google
          // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
          merchantId: process.env.VUE_APP_GOOGLE_PAY_MERCHANT_ID,
          merchantName: process.env.VUE_APP_GOOGLE_PAY_MERCHANT_NAME,
        }
        return paymentDataRequest
      }

      const getGooglePaymentsClient = () => {
        if (paymentsClient === null) {
          paymentsClient = new window.google.payments.api.PaymentsClient({
            // Alterar o environment para 'PRODUCTION' em prod
            environment: process.env.VUE_APP_GOOGLE_PAY_ENVIRONMENT,
          })
        }
        return paymentsClient
      }

      const onGooglePayLoaded = () => {
        const paymentsClient = getGooglePaymentsClient()
        paymentsClient
          .isReadyToPay(getGoogleIsReadyToPayRequest())
          .then((response) => {
            if (response.result) {
              addGooglePayButton()
              // @todo prefetch payment data to improve performance after confirming site functionality
              // prefetchGooglePaymentData();
              this.$emit('loaded', response.result)
            }
          })
          .catch((err) => {
            // show error in developer console for debugging
            console.error(err)
            this.$emit('loadedError', err)
          })
      }

      const addGooglePayButton = () => {
        const paymentsClient = getGooglePaymentsClient()
        const button = paymentsClient.createButton({
          onClick: onGooglePaymentButtonClicked,
          buttonColor: 'white',
        })
        this.$refs.googlePay.appendChild(button)
      }

      const getGoogleTransactionInfo = () => ({
        countryCode: 'US',
        currencyCode: 'USD',
        totalPriceStatus: 'FINAL',
        // set to cart total
        totalPrice: this.totalPrice,
      })

      // function prefetchGooglePaymentData() {
      //   const paymentDataRequest = getGooglePaymentDataRequest();
      //   // transactionInfo must be set but does not affect cache
      //   paymentDataRequest.transactionInfo = {
      //     totalPriceStatus: "NOT_CURRENTLY_KNOWN",
      //     currencyCode: "USD",
      //   };
      //   const paymentsClient = getGooglePaymentsClient();
      //   paymentsClient.prefetchPaymentData(paymentDataRequest);
      // }

      const onGooglePaymentButtonClicked = () => {
        const paymentDataRequest = getGooglePaymentDataRequest()
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo()

        const paymentsClient = getGooglePaymentsClient()
        paymentsClient
          .loadPaymentData(paymentDataRequest)
          .then((paymentData) => {
            // handle the response
            processPayment(paymentData)
          })
          .catch((err) => {
            // show error in developer console for debugging
            console.error(err)
            this.$emit('paymentError', err)
          })
      }
      const processPayment = (paymentData) => {
        // show returned data in developer console for debugging
        // @todo pass payment token to your gateway to process payment
        const paymentToken =
          paymentData.paymentMethodData.tokenizationData.token
        this.$emit('paymentSuccess', paymentToken)
      }

      onGooglePayLoaded()
    },
  },
}
</script>

<style>
.gpay-card-info-container {
  width: 10%;
  height: 30px !important;
  min-height: 30px !important;
  box-shadow: none !important;
  border-radius: 9999px !important;
}
.googlePayIcon {
  position: absolute;
  height: 32px;
  width: 100%;
  z-index: 999;
  background: white;
  border-radius: 9999px;
}
</style>
