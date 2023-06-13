<script setup>
definePageMeta({
  layout: "home",
});

const search = ref("");
const method = ref("State");
const methods = [
  { id: 1, text: "All", value: "1" },
  { id: 2, text: "Active", value: "2" },
  { id: 3, text: "Inactive", value: "3" },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
  {
    id: 2,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
  {
    id: 3,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
  {
    id: 4,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
  {
    id: 5,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
  {
    id: 6,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
  {
    id: 7,
    name: "John Doe",
    email: "a@gmail.com",
    phone: "1234567890",
    businessName: "ABC",
    signUpDate: "12/12/2021",
    feeds: "12",
    lastMonthSpend: "$100",
  },
];

const pastMonths = ref("Past Month");
const showVCalender = ref(true);
// const vCalenderShow = () => {
//   showVCalender.value = true;
// };
// const vCalenderHide = () => {
//   showVCalender.value = false;
// };
</script>

<template>
  <div class="flex flex-col p-[30px] w-full h-full">
    <div class="flex flex-row items-center justify-between w-full">
      <BaseInputText
        id="search"
        type="text"
        v-model="search"
        text-input="textInput px-4 pl-0 py-2 "
        input-wrapper="inputWrapper rounded-full shadow-[0px_2px_4px_#0000004D] bg-white"
        place-holder-color="#7D80BD"
        place-holder="Search"
        color="#7D80BD"
        background="#FFFFFF"
      >
        <template v-slot:icon-before>
          <ClientOnly>
            <BaseIconSearch class="text-[#7D80BD] pl-4" />
          </ClientOnly>
        </template>
      </BaseInputText>
      <div class="flex items-center space-x-4">
        <BaseInputSelect
          id="methods"
          v-model="method"
          class="md:text-lg text-base"
          text-input="textInput w-[200px] md:py-1.5 py-2"
          toggle-button="toggleButton"
          background="#7D80BD"
          color="#ffffff"
          caret-bg="#7D80BD"
          caret-color="#ffffff"
          :place-holder="'State'"
          :place-holder-disabled="true"
          opacity="0.5"
          :options="methods"
        />
        <div
          class="w-[200px] text-lg font-bold relative group cursor-pointer"
          @click="vCalenderShow()"
          @mouseleave.stop="vCalenderHide()"
        >
          <BaseInputSelect
            id="pastMonth3"
            v-model="pastMonths"
            class="md:text-lg text-base not-clickable selectSearch"
            class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
            text-input="textInput w-[200px] md:py-1.5 py-2"
            :place-holder="pastMonths"
            color="#ffffff"
            toggle-button="toggleButton"
            background="#7D80BD"
            caret-bg="#7D80BD"
            caret-color="#ffffff"
            :place-holder-disabled="true"
            opacity="0.5"
          />
          <!-- <BaseInputSelect
            id="pastMonth3"
            v-model="pastMonths"
            :toggle-select="showVCalender"
            class="not-clickable selectSearch"
            class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
            :place-holder="pastMonths"
            color="#F8F8F8"
            value="Past Month"
            background="#7D80BD"
            caret-bg="#7D80BD"
            scroll-color="#5b5fcc"
          /> -->
          <div
            class="w-[400px] shadow-xl absolute top-13.3 lg:right-0 md:-right-0 z-50 block cursor-pointer bg-white rounded-3xl border-top"
          >
            <v-calender-with-preset
              :show-v-calender="showVCalender"
              date-picker-color="search"
              @dateRange="pastMonthDateRageEvent"
              @pastmonth="pastMonthsValue"
              @hide-v-calender="vCalenderHide()"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="web-card w-full h-full mt-[30px]">
      <div class="card-header">
        <h3 class="card-title">Users</h3>
      </div>
      <div class="card-body scroll">
        <table class="min-w-full table-wrapper">
          <thead>
            <tr class="bg-[#E8E8E8] border-b sticky top-0 left-0 z-1">
              <th scope="col" class="table-th">
                <strong>Name</strong>
              </th>
              <th scope="col" class="table-th">
                <strong>Email</strong>
              </th>
              <th scope="col" class="table-th">
                <strong>Phone</strong>
              </th>
              <th scope="col" class="table-th">
                <strong>Business Name</strong>
              </th>
              <th scope="col" class="table-th">
                <strong>Sign Up Date</strong>
              </th>
              <th scope="col" class="table-th">
                <strong>Feeds</strong>
              </th>
              <th scope="col" class="table-th">
                <strong>Last Month Spend</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="'user' + index"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-[#E8E8E8]'"
            >
              <td class="table-td">
                <div class="flex items-center space-x-3">
                  <BaseIconUser class="w-6 h-6 rounded-full" />
                  <span class="table-span">{{ user.name }}</span>
                </div>
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.email }}</span>
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.phone }}</span>
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.businessName }}</span>
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.signUpDate }}</span>
                <!-- <DateTime
                  :datetime="user.signUpDate"
                  format="MMMM, dd yyyy, hh:mm aa"
                  :show-time="false"
                  class="table-span"
                /> -->
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.feeds }}</span>
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.lastMonthSpend }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.web-card {
  @apply bg-white rounded-3xl overflow-hidden;
  height: calc(100% - 130px);
}
.card-header {
  @apply bg-[#7D80BD] text-center py-2;
}
.card-title {
  @apply text-light-white font-bold xl:text-xl md:text-lg text-base;
}
.card-body {
  height: calc(100% - 43px);
  @apply overflow-auto scroll;
}
// .mobile-card-body {
//   height: calc(100% - 40px);
//   @apply overflow-auto scroll;
// }
.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 text-left tracking-wider xl:text-lg md:text-base text-sm md:font-bold whitespace-nowrap md:text-ash-default text-yellow-600;
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
