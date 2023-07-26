import { defineStore, Store } from "pinia";
import { PAYMENT_METHOD } from "~/constants/urls";
const { fetch } = useFetched();

export const usePaymentStore = defineStore("payment", () => {
  // state
  const showPaymentModalRef = ref<boolean>(false);
  const billingInfoRef = ref<any>({});
  const showBillingInfomModalRef = ref<boolean>(false);
  const singleBillingInfoRef = ref<any>({});

  // getters
  const showPaymentModal = computed(() => showPaymentModalRef.value);
  const billingInfo = computed(() => billingInfoRef.value);
  const showBillingInfomModal = computed(() => showBillingInfomModalRef.value);
  const singleBillingInfo = computed(() => singleBillingInfoRef.value);

  // actions
  const setShowPaymentModal = (payload: boolean) => {
    showPaymentModalRef.value = payload;
  };
  const getBillingInfo = async () => {
    try {
      const res = await fetch(PAYMENT_METHOD, null, null);
      billingInfoRef.value = res.data;
    } catch (error) {
      console.log("error", error);
    }
  };
  const setShowBillingInfoModal = (payload: boolean) => {
    showBillingInfomModalRef.value = payload;
  };
  const setSingleBillingInfo = (payload: number) => {
    singleBillingInfoRef.value = {};
    singleBillingInfoRef.value = billingInfoRef.value.find(
      (item: any) => item.id === payload
    );
  };

  return {
    showPaymentModal,
    setShowPaymentModal,
    billingInfo,
    getBillingInfo,
    showBillingInfomModal,
    setShowBillingInfoModal,
    singleBillingInfo,
    setSingleBillingInfo,
  };
});
