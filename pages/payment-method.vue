<script setup>
import { storeToRefs } from "pinia";
import { usePaymentStore } from "~/stores/payment";
import { useProfileStore } from "~/stores/the-profile";
import { PAYMENT_METHOD } from "~/constants/urls";

definePageMeta({
  layout: "home",
  middleware: ["auth"],
});
const nuxtApp = useNuxtApp();
const { fetch } = useFetched();
const { setIsShowProfile } = useProfileStore();
const {
  setShowPaymentModal,
  getBillingInfo,
  setShowBillingInfoModal,
  setSingleBillingInfo,
} = usePaymentStore();
const { billingInfo, showPaymentModal } = storeToRefs(usePaymentStore());

const showDeleteAlert = ref(false);
const deletedCardId = ref("");
const cardDeleteProcess = ref(false);

const allBillingInfo = computed(() => billingInfo.value);

const showChangeBillingInfo = ($event, id) => {
  setIsShowProfile(false);
  setShowPaymentModal(false);
  setSingleBillingInfo(id);
  setShowBillingInfoModal(true);
  $event.stopPropagation();
};
const deleteConfirm = async () => {
  nuxtApp.$toast("clear");
  try {
    cardDeleteProcess.value = true;
    const response = await fetch(PAYMENT_METHOD, {
      method: "DELETE",
      body: {
        id: deletedCardId.value,
      },
    });
    if (response.success) {
      nuxtApp.$toast("success", {
        message: response.message,
        className: "toasted-bg-archive",
      });
      getBillingInfo()
    } else {
      nuxtApp.$toast("error", {
        message: response.message,
        className: "toasted-bg-alert",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    showDeleteAlert.value = false;
    deletedCardId.value = "";
    cardDeleteProcess.value = false;
  }
};
const deleteCard = (cardId) => {
  showDeleteAlert.value = true;
  deletedCardId.value = cardId;
};
const deleteCancel = () => {
  showDeleteAlert.value = false;
  deletedCardId.value = "";
};
const changeBilling = ($event) => {
  setShowBillingInfoModal(false);
  setTimeout(() => {
    setShowPaymentModal(true);
  });
  $event.stopPropagation();
};
onMounted(() => {
  // API Call
  getBillingInfo();
});
</script>

<template>
  <section class="w-full h-full">
    <div class="flex flex-col md:p-[30px] p-4 w-full h-full relative">
      <div class="web-card w-full h-full">
        <div class="card-header">
          <h3 class="card-title">Billing Information</h3>
        </div>
        <div class="card-body scroll h-[calc(100%-116px)]">
          <table class="min-w-full table-wrapper">
            <thead>
              <tr class="bg-[#E8E8E8] border-b sticky top-0 left-0 z-1">
                <th scope="col" class="table-th">
                  <strong>Action</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Method</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Name</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Number/Email</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Expiration</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Default Card</strong>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(billing, index) in allBillingInfo"
                :key="'billing' + index"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-[#E8E8E8]'"
              >
                <td class="table-td">
                  <div class="flex flex-row space-x-2 items-center">
                    <a
                      data-title="Edit"
                      class="w-7 h-7 cursor-pointer flex items-center justify-center"
                      @click="showChangeBillingInfo($event, billing.id)"
                    >
                      <BaseIconEdit
                        class="w-4 h-4 rounded-full text-orange-midlight"
                      />
                    </a>
                    <a
                      data-title="Delete"
                      class="delete w-7 h-7 cursor-pointer flex items-center justify-center"
                      @click="deleteCard(billing.id)"
                    >
                      <div
                        class="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <ClientOnly>
                          <BaseIconCrossIcon class="text-white text-sm" />
                        </ClientOnly>
                      </div>
                    </a>
                  </div>
                </td>
                <td class="table-td">
                  <span class="table-span">{{ billing.brand }}</span>
                </td>
                <td class="table-td">
                  <span class="table-span">{{ billing.name }}</span>
                </td>
                <td class="table-td">
                  <span class="table-span">
                    {{ billing.last4 ? `*${billing.last4}` : "" }}
                    {{ billing.last4 && billing.email ? "/" : "" }}
                    {{ billing.email ? `${billing.email}` : "" }}
                  </span>
                </td>
                <td class="table-td">
                  <span class="table-span"
                    >{{ billing.expMonth }}/{{ billing.expYear }}</span
                  >
                </td>
                <td class="table-td">
                  <span class="table-span">{{
                    billing.isDefault ? "Yes" : "No"
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex items-center justify-end py-4 px-1 sm:px-4 md:py-0 my-4"
        >
          <div class="text-right w-full space-x-2 md:space-x-4">
            <!-- <button class="footer-btn">Close Account</button> -->
            <button class="footer-btn" @click="changeBilling($event)">
              Change Billing
            </button>
            <!-- <button class="footer-btn">View Invoices</button> -->
          </div>
        </div>
      </div>
    </div>
    <ConfirmationModal
      :processing="cardDeleteProcess"
      :show="showDeleteAlert"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></ConfirmationModal>
  </section>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}
/* for slideInOut */
.slideInOut-enter-active,
.slideInOut-leave-active {
  transition: right 0.5s ease-in-out;
}
.slideInOut-enter-from,
.slideInOut-leave-to {
  right: -100%;
}
.web-card {
  @apply bg-white rounded-3xl overflow-hidden;
  // height: calc(100% - 130px);
  box-shadow: 2px 2px 4px #2e2b2b29;
}
.card-header {
  @apply bg-orange-midlight text-center py-2;
}
.card-title {
  @apply text-light-white font-bold xl:text-xl md:text-lg text-base;
}
.card-body {
  @apply overflow-auto scroll;
}
.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 text-left tracking-wider xl:text-lg md:text-base text-sm md:font-bold whitespace-nowrap text-ash-default;
}
.tooltip {
  @apply absolute 
  text-white 
  bg-yellow-600
  z-50
  left-5 
  -top-5 
  text-left
  invisible 
  md:p-1.5 
  p-0.5 
  md:px-4 
  px-2 
  text-sm 
  rounded-xl break-words 
  shadow-lg md:w-48;

  white-space: break-spaces;
}
.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.table-td {
  @apply md:px-6 px-6 md:py-2 py-1.5 text-left whitespace-nowrap;
}
.table-span {
  @apply text-gray-500 xl:text-xl md:text-lg text-base;
}
.scroll {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  scrollbar-width: thin; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: #ececec;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
    border-radius: 5px;
  }
}
[data-title]:after {
  color: #bb8b28;
  left: 100%;
  z-index: 9999999999;
}
[data-title].delete:after {
  color: red;
  left: 100%;
  z-index: 9999999999;
}
.footer-btn {
  @apply focus:outline-none rounded-full
  border-2 border-orange-midlight py-1 lg:px-5 md:px-2 px-1 text-center text-white
  bg-orange-midlight font-bold md:text-lg
  text-sm;
}
</style>
