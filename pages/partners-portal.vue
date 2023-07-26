<script setup lang="ts">
import { PARTNER_INFO, PARTNER_PAYOUT } from "~/constants/urls";
definePageMeta({
  layout: "home",
  middleware: ["auth", "payment"],
});

const $config = useRuntimeConfig();
const route = useRoute();
const { fetch } = useFetched();
useHead(() => ({
  title: "Partners Portal",
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: `${$config.public.siteUrl}/${route.name}`,
    },
  ],
}));
const nuxtApp = useNuxtApp();

const portalInfo = ref({});
const payoutHistory = ref({});

// API Call
const partnerInfo = async () => {
  try {
    const res = await fetch(PARTNER_INFO, null, null);
    portalInfo.value = res.data;
  } catch (error) {
    console.log("error", error);
  }
};
const partnerPayout = async () => {
  try {
    const res = await fetch(PARTNER_PAYOUT, null, null);
    nuxtApp.$toast("clear");
    res.data.length > 0
      ? (payoutHistory.value = res.data)
      : nuxtApp.$toast("success", {
          message: "There have no payout history.",
          className: "toasted-bg-archive",
        });
  } catch (error) {
    console.log("error", error);
  }
};

const dateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
  partnerInfo();
  partnerPayout();
});
</script>

<template>
  <div class="w-full h-full md:p-[30px] p-4">
    <div class="web-card w-full h-full">
      <div class="card-header">
        <h3 class="card-title">Partner Portal</h3>
      </div>
      <div class="flex flex-col h-[calc(100%-44px)] md:pt-0 pt-4">
        <div
          class="md:hidden md:w-[60px] self-center md:h-[60px] w-[40px] h-[40px] bg-orange-dark bg-opacity-50 flex justify-center items-center rounded-[5px]"
        >
          <ClientOnly>
            <fa
              class="md:w-[17px] w-[10px] md:h-[39px] h-[29px] text-[#F2F2F2]"
              :icon="['fas', 'dollar-sign']"
            />
          </ClientOnly>
        </div>
        <div
          class="flex whitespace-nowrap justify-between flex-nowrap lg:p-[30px] p-[20px] lg:space-x-0 md:space-x-4 space-x-0 items-center"
        >
          <div
            class="hidden md:w-[60px] md:h-[60px] w-[40px] h-[40px] bg-orange-dark bg-opacity-50 md:flex justify-center items-center rounded-[5px]"
          >
            <ClientOnly>
              <fa
                class="md:w-[17px] w-[10px] md:h-[39px] h-[29px] text-[#F2F2F2]"
                :icon="['fas', 'dollar-sign']"
              />
            </ClientOnly>
          </div>
          <div class="text-orange-dark md:text-center text-left">
            <p class="xl:text-xl md:text-base text-base font-medium">
              ${{ portalInfo.total_income | 0 }}
            </p>
            <h2 class="xl:text-2xl md:text-base text-xs font-normal">
              Total Income
            </h2>
          </div>
          <div class="text-orange-dark md:text-center text-right">
            <p class="xl:text-xl md:text-base text-base font-medium">
              ${{ portalInfo.monthly_income | 0 }}
            </p>
            <h2 class="xl:text-2xl md:text-base text-xs font-normal">
              Monthly Net Profit
            </h2>
          </div>
          <div class="text-orange-dark text-center md:block hidden">
            <p class="xl:text-xl md:text-base text-base font-medium">
              {{ portalInfo.total_users | 0 }}
            </p>
            <h2 class="xl:text-2xl md:text-base text-base font-normal">
              Total Users
            </h2>
          </div>
          <div class="text-orange-dark text-right md:block hidden">
            <p class="xl:text-xl md:text-base text-base font-medium">
              {{ portalInfo.new_users | 0 }}
            </p>
            <h2 class="xl:text-2xl md:text-base text-base font-normal">
              New Users
            </h2>
          </div>
        </div>
        <div
          class="flex justify-between flex-nowrap lg:p-[30px] p-[20px] pt-[10px] pb-[10px] lg:space-x-0 space-x-4 md:hidden items-center"
        >
          <div class="text-orange-dark md:text-center text-left">
            <p class="xl:text-xl md:text-lg text-base font-medium">
              {{ portalInfo.total_users }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-xs font-normal">
              Total Users
            </h2>
          </div>
          <div class="text-orange-dark text-right">
            <p class="xl:text-xl md:text-lg text-base font-medium">
              {{ portalInfo.new_users }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-xs font-normal">
              New Users
            </h2>
          </div>
        </div>
        <div
          class="md:pt-10 pt-5 pb-4 md:h-[calc(100%-99px)] h-[calc(100%-165px)]"
        >
          <div class="w-full h-10">
            <h3
              class="w-full h-full text-center text-orange-dark text-lg font-bold"
            >
              Payout History
            </h3>
          </div>
          <div class="card-body scroll lg:mx-[30px] mx-[20px] flex-grow">
            <table
              class="min-w-full table-wrapper rounded-t-[20px] overflow-hidden"
            >
              <thead>
                <tr
                  class="bg-[#E4801D] bg-opacity-[0.16] border-b sticky top-0 left-0 z-1"
                >
                  <th scope="col" class="table-th">
                    <strong>Date</strong>
                  </th>
                  <th scope="col" class="table-th">
                    <strong>Amount</strong>
                  </th>
                  <th scope="col" class="table-th">
                    <strong>Payment Method</strong>
                  </th>
                  <th scope="col" class="table-th">
                    <strong>Status</strong>
                  </th>
                  <th scope="col" class="table-th">
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(payout, index) in payoutHistory"
                  :key="'user' + index"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-[#E8E8E8]'"
                >
                  <td class="table-td">
                    <span class="table-span">{{
                      dateFormat(payout.created_at)
                    }}</span>
                  </td>
                  <td class="table-td">
                    <span class="table-span">{{ payout.total }}</span>
                  </td>
                  <td class="table-td">
                    <span class="table-span">{{ payout.payment_method }}</span>
                  </td>
                  <td class="table-td">
                    <span class="table-span">{{ payout.status }}</span>
                  </td>
                  <td class="table-td">
                    <ClientOnly>
                      <span class="table-span"
                        ><fa
                          class="text-[#00CC44]"
                          :icon="['fas', 'fa-download']"
                      /></span>
                    </ClientOnly>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.web-card {
  @apply bg-white rounded-3xl overflow-hidden;
}
.card-header {
  @apply bg-orange-dark text-center py-2;
}
.card-title {
  @apply text-light-white font-bold xl:text-xl md:text-lg text-base;
}
.card-body {
  height: calc(100% - 43px);
  @apply overflow-auto;
}
// .mobile-card-body {
//   height: calc(100% - 40px);
//   @apply overflow-auto scroll;
// }
.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 text-left tracking-wider xl:text-lg md:text-base text-sm md:font-bold whitespace-nowrap text-[#434343];
}
.table-th:nth-child(n-1) {
  text-align: center;
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
.table-td:nth-child(n-1) {
  text-align: center;
}
.table-span {
  @apply text-gray-500 xl:text-xl md:text-lg text-base;
}
.scroll {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
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
    background: #e4801d;
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
</style>
