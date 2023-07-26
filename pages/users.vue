<script setup>
import { storeToRefs } from "pinia";
import { useHeaderStore } from "~/stores/the-header";
import { PARTNER_USERS } from "~/constants/urls";

definePageMeta({
  layout: "home",
  middleware: ["auth", "payment"],
});

const { fetch } = useFetched();
const { setIsUserModal } = useHeaderStore();
const { isUserModal } = storeToRefs(useHeaderStore());

const search = ref("");
const method = ref("State");
const methods = [
  { id: 1, text: "All", value: "1" },
  { id: 2, text: "Active", value: "2" },
  { id: 3, text: "Inactive", value: "3" },
];
const date = ref("Sign Up Date");

const users = ref([]);

// API Call
const partnerUsers = async () => {
  try {
    const res = await fetch(PARTNER_USERS);
    users.value = res.data;
  } catch (error) {
    console.log("error", error);
  }
};

const pastMonths = ref("Past Month");
const showVCalender = ref(false);
const selectedColor = ref("blue");
const attrs = ref([
  {
    key: "test",
    highlight: true,
    dates: { start: new Date(2020, 3, 15), end: new Date(2019, 3, 19) },
  },
]);
const range = ref({
  start: new Date(2023, 0, 6),
  end: new Date(2023, 0, 10),
});
const vCalenderShow = () => {
  showVCalender.value = true;
};
const vCalenderHide = () => {
  showVCalender.value = false;
};
const clearFilter = () => {
  date.value = "Sign Up Date";
  method.value = "State";
};
onMounted(() => {
  partnerUsers();
});
watch(
  () => range.value,
  (value) => console.log(value, "here the update range")
);
</script>

<template>
  <div class="flex flex-col md:p-[30px] p-4 w-full h-full relative">
    <div
      class="hidden md:flex flex-row items-center justify-between md:space-x-4 space-x-0 w-full"
    >
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
          class="relative"
          @click.stop="vCalenderShow()"
          @mouseenter="vCalenderShow()"
          @mouseleave.stop="vCalenderHide()"
        >
          <BaseButton
            class="w-[180px] h-10 px-4 mx-auto text-[#ffffff] font-bold bg-[#7D80BD] border-none outline-none md:text-xl text-base text-center"
            :text="'Sign Up Date'"
          />
          <div class="absolute flex right-0 z-[1]">
            <VCalenderWithPreset
              style="width: 460px"
              :show-v-calender="showVCalender"
              date-picker-color="search"
              
            />
            <!-- @dateRange="pastMonthDateRageEvent" -->
            <!--
              @pastmonth="pastMonthsValue"
              @hide-v-calender="vCalenderHide()"
            -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="md:hidden overlay"
      v-if="isUserModal"
      @click="setIsUserModal(false)"
    ></div>
    <Transition name="slideInOut">
      <div
        v-if="isUserModal"
        class="z-30 flex md:hidden top-0 right-0 fixed flex-col space-y-5 w-full bg-[#171D26] rounded-b-3xl p-2.5 pb-8"
      >
        <div
          class="flex justify-between filter-head text-xl px-2 mb-8 pt-2 text-purple-midlight"
        >
          <h5 class="text-2xl">Filter</h5>
          <h2>
            <ClientOnly>
              <fa
                class="text-[#7D80BD] text-2xl font-normal"
                :icon="['fas', 'times']"
                @click="setIsUserModal(false)"
              />
            </ClientOnly>
          </h2>
        </div>
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
        <BaseInputSelect
          id="methods"
          v-model="method"
          class="md:text-lg text-base"
          text-input="textInput w-full md:py-1.5 py-2"
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
        <BaseInputSelect
          id="date"
          v-model="date"
          class="md:text-lg text-base"
          text-input="textInput w-full md:py-1.5 py-2"
          toggle-button="toggleButton"
          background="#7D80BD"
          color="#ffffff"
          caret-bg="#7D80BD"
          caret-color="#ffffff"
          :place-holder="'Sign Up Date'"
          :place-holder-disabled="true"
          opacity="0.5"
          :options="dates"
        />
        <div class="pt-7 flex justify-between w-full space-x-[18px]">
          <BaseButton
            type="submit"
            text="Clear"
            class="text-[#7D80BD] border-2 border-[#7D80BD] py-2 whitespace-nowrap h-10 px-4 text-base md:text-xl font-semibold rounded-full w-1/2"
            @click="clearFilter()"
          />
          <BaseButton
            type="submit"
            text="Filter"
            class="bg-[#7D80BD] text-white border-2 border-[#7D80BD] py-2 whitespace-nowrap h-10 px-4 text-base md:text-xl font-semibold rounded-full w-1/2"
          />
        </div>
      </div>
    </Transition>

    <div class="web-card w-full h-full md:mt-[30px]">
      <div class="card-header">
        <h3 class="card-title">Users</h3>
      </div>
      <div class="card-body scroll md:h-[calc(100%-44px)] h-[calc(100%-40px)]">
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
                <strong>Status</strong>
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
                <span class="table-span">{{ user.dateJoined }}</span>
                <!-- <DateTime
                  :datetime="user.date_joined"
                  format="MMMM, dd yyyy, hh:mm aa"
                  :show-time="false"
                  class="table-span"
                /> -->
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.feeds }}</span>
              </td>
              <td class="table-td">
                <span class="table-span">{{ user.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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
  @apply bg-[#7D80BD] text-center py-2;
}
.card-title {
  @apply text-light-white font-bold xl:text-xl md:text-lg text-base;
}
.card-body {
  @apply overflow-auto scroll;
}
// .mobile-card-body {
//   height: calc(100% - 40px);
//   @apply overflow-auto scroll;
// }
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
  scrollbar-color: #7d80bd #ececec; /* Firefox 64 */
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
    background: #7d80bd;
    border-radius: 5px;
  }
}
// .scroll {
//   scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
//   /* Handle */
//   &::-webkit-scrollbar-thumb {
//     background: #e0ad1f;
//   }

//   /* Handle on hover */
//   &::-webkit-scrollbar-thumb:hover {
//     background: #e0ad1f;
//   }
// }
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
