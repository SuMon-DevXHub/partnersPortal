<script setup>
definePageMeta({
  layout: "home",
});

const portalHistory = ref({
  totalIncome: "$3511.98",
  monthlyNetProfit: "$129.98",
  totalUsers: "10",
  newUsers: "+1",
});
const payoutHistory = ref([
  {
    date: "Jan 22, 2022",
    amount: "$500",
    paymentethod: "PayPal",
    status: "Approved",
    approved: "",
  },
  {
    date: "Jan 22, 2022",
    amount: "$700",
    paymentethod: "Bank Transfer",
    status: "Pending",
    approved: "",
  },
  {
    date: "Jan 22, 2022",
    amount: "$500",
    paymentethod: "PayPal",
    status: "Approved",
    approved: "",
  },
  {
    date: "Jan 22, 2022",
    amount: "$750",
    paymentethod: "Bank Transfer",
    status: "Pending",
    approved: "",
  },
  {
    date: "Jan 22, 2022",
    amount: "$500",
    paymentethod: "PayPal",
    status: "Approved",
    approved: "",
  },
  {
    date: "Jan 22, 2022",
    amount: "$750",
    paymentethod: "Bank Transfer",
    status: "Pending",
    approved: "",
  },
]);
</script>

<template>
  <div class="w-full h-full md:p-[30px] p-4">
    <div class="web-card w-full h-full">
      <div class="card-header">
        <h3 class="card-title">Partner Portal</h3>
      </div>
      <div class="flex flex-col">
        <div
          class="flex justify-between flex-nowrap lg:p-[30px] p-[20px] lg:space-x-0 space-x-4 items-center"
        >
          <div
            class="md:w-[60px] md:h-[60px] w-[40px] h-[40px] bg-orange-dark bg-opacity-50 flex justify-center items-center rounded-[5px]"
          >
            <ClientOnly>
              <fa
                class="md:w-[17px] w-[10px] md:h-[39px] h-[29px] text-[#F2F2F2]"
                :icon="['fas', 'dollar-sign']"
              />
            </ClientOnly>
          </div>
          <div class="text-orange-dark text-center">
            <p class="xl:text-xl md:text-lg text-base">
              {{ portalHistory.totalIncome }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-xs font-medium">
              Total Income
            </h2>
          </div>
          <div class="text-orange-dark md:text-center text-right">
            <p class="xl:text-xl md:text-lg text-base">
              {{ portalHistory.monthlyNetProfit }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-xs font-medium">
              Monthly Net Profit
            </h2>
          </div>
          <div class="text-orange-dark text-center md:block hidden">
            <p class="xl:text-xl md:text-lg text-base">
              {{ portalHistory.totalUsers }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-base font-medium">
              Total Users
            </h2>
          </div>
          <div class="text-orange-dark text-right md:block hidden">
            <p class="xl:text-xl md:text-lg text-base">
              {{ portalHistory.newUsers }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-base font-medium">
              New Users
            </h2>
          </div>
        </div>
        <div
          class="flex justify-between flex-nowrap lg:p-[30px] p-[20px] lg:space-x-0 space-x-4 md:hidden items-center"
        >
          <div
            class="md:w-[60px] md:h-[60px] w-[40px] h-[40px] bg-orange-dark bg-opacity-50 flex justify-center items-center rounded-[5px]"
          >
            <ClientOnly>
              <fa
                class="md:w-[17px] w-[10px] md:h-[39px] h-[29px] text-[#F2F2F2]"
                :icon="['fas', 'dollar-sign']"
              />
            </ClientOnly>
          </div>
          <div class="text-orange-dark text-center">
            <p class="xl:text-xl md:text-lg text-base">
              {{ portalHistory.totalUsers }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-xs font-medium">
              Total Users
            </h2>
          </div>
          <div class="text-orange-dark text-right">
            <p class="xl:text-xl md:text-lg text-base">
              {{ portalHistory.newUsers }}
            </p>
            <h2 class="xl:text-2xl md:text-lg text-xs font-medium">
              New Users
            </h2>
          </div>
        </div>
        <div class="w-full h-10 mt-10">
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
                  <span class="table-span">{{ payout.date }}</span>
                </td>
                <td class="table-td">
                  <span class="table-span">{{ payout.amount }}</span>
                </td>
                <td class="table-td">
                  <span class="table-span">{{ payout.paymentethod }}</span>
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
  scrollbar-color: #e4801d #feebb3; /* Firefox 64 */
  scrollbar-width: thin; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: #feebb3;
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
