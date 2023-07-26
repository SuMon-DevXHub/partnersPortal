<script setup lang="ts">
import AccountSecurityIcon from "~/components/base/icon/AccountSecurityIcon.vue";
import PasswordIcon from "~/components/base/icon/PasswordIcon.vue";
import PersonalInformationIcon from "~/components/base/icon/PersonalInformationIcon.vue";
// import SocialProfileIcon from "~/components/base/icon/SocialProfileIcon.vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/the-profile";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

definePageMeta({
  layout: "home",
  middleware: ["auth", "payment"],
});
// breakpoint
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greaterOrEqual("lg");
// State
const { userInfo } = storeToRefs(useProfileStore());
const currentActiveTab = shallowRef(0);
const currentActiveTabName = shallowRef("");
const route = useRoute();
const personalSettingsTab = shallowRef([
  {
    id: 1,
    image: PersonalInformationIcon,
    title: "Personal Information",
    slug: "partners-profile/information",
  },
  {
    id: 2,
    image: PasswordIcon,
    title: "Password",
    slug: "partners-profile/password",
  },
]);
const showMenuBar = shallowRef(false);
const windowWidth = shallowRef(0);
const showMenuContent = shallowRef(false);
onMounted(() => {
  setActiveRoute(route.name);
  if (isDesktop.value || window.innerWidth >= 1024) {
    showMenuBar.value = true;
  } else {
    showMenuBar.value = false;
  }
});

const selectCurrentTab = (id: number) => {
  personalSettingsTab.value.forEach((item) => {
    if (item.id === id) {
      currentActiveTabName.value = item.title;
    }
  });
  currentActiveTab.value = id;
};
const handleMenuBar = () => {
  if (showMenuBar.value && !isDesktop.value) {
    showMenuBar.value = false;
  }
};
const setActiveRoute = (routeName: any) => {
  if (routeName === "partners-profile-information") {
    selectCurrentTab(personalSettingsTab.value[0].id);
  } else if (routeName === "partners-profile-password") {
    selectCurrentTab(personalSettingsTab.value[1].id);
  } else if (routeName === "partners-profile-security") {
    selectCurrentTab(personalSettingsTab.value[2].id);
  }
};
watch(
  () => route,
  (value) => {
    if (value.name) {
      setActiveRoute(value.name);
    }
    if (showMenuBar.value && !isDesktop.value) {
      showMenuBar.value = false;
    }
  },
  {
    deep: true,
  }
);
watch(
  () => isDesktop.value,
  (value) => {
    if (value) {
      showMenuBar.value = true;
    } else {
      showMenuBar.value = false;
    }
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div class="p-4 md:p-[30px] bg-[#F1F2F6] h-full">
    <ClientOnly>
      <div class="flex flex-col mainBody relative">
        <div
          class="leftWrapper transition-all duration-300 ease-in-out lg:hidden mobileMenu w-full md:w-1/2 lg:w-1/3"
          :class="[
            !isDesktop ? 'absolute bg-white h-full z-[2]' : '',
            showMenuBar
              ? 'md:border-r-4 left-0 border-[#8DB230]'
              : '-left-[110%] md:-left-[60%] lg:left-0 border-r-0',
          ]"
        >
          <div class="text-center mt-[50px] px-2 xl:px-4 dx:px-[30px]">
            <div
              class="flex justify-center items-center w-[120px] h-[120px] border-2 border-[#8DB230] rounded-full mx-auto"
            >
              <img
                :src="userInfo?.avatar"
                alt=""
                srcset=""
                class="w-[110px] h-[110px]"
              />
            </div>
            <div class="text-[#8DB230] font-bold text-2xl">
              {{ userInfo?.firstName }} {{ userInfo?.lastName }}
            </div>
            <div class="text-[#656565] text-base">
              <p>{{ userInfo?.email }}</p>
              <p>{{ userInfo?.phone }}</p>
            </div>
            <div class="pt-[70px]">
              <div
                v-for="personalSettings in personalSettingsTab"
                :key="personalSettings.id"
                class="rounded-md text-xl cursor-pointer"
                :class="
                  currentActiveTab === personalSettings.id
                    ? 'text-[#8DB230] bg-[#E8EBED]'
                    : 'text-[#656565]'
                "
                @click="selectCurrentTab(personalSettings.id)"
              >
                <NuxtLink
                  :to="`/${personalSettings.slug}`"
                  class="flex space-x-5 px-3 md:px-5 lg:px-2 xl:px-4 dx:px-5 py-4"
                  @click="showMenuBar = false"
                >
                  <component
                    :is="personalSettings.image"
                    class="w-6 h-6"
                    :fill="
                      currentActiveTab === personalSettings.id
                        ? '#8DB230'
                        : '#656565'
                    "
                  />
                  <p class="whitespace-nowrap">
                    {{ personalSettings.title }}
                  </p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="headerShape">
          <div class="flex items-center w-full h-10">
            <div
              class="h-8 md:h-10 w-8 md:w-10 ml-1"
              @click="showMenuBar = !showMenuBar"
            >
              <BaseIconMenuIcon
                class="w-full h-full bg-white rounded-full lg:hidden"
              />
            </div>
            <p class="flex-grow self-center">
              {{ isDesktop ? "Personal Information" : currentActiveTabName }}
            </p>
          </div>
        </div>
        <div class="flex w-full h-full">
          <div
            class="border-r-4 border-[#8DB230] leftWrapper transition-all duration-300 ease-in-out hidden lg:block"
            :class="[
              !isDesktop ? 'absolute bg-white h-full z-[1]' : '',
              showMenuBar ? 'w-full md:w-1/2 lg:w-1/3' : 'w-0 border-r-0',
            ]"
          >
            <div
              v-if="(showMenuBar && !isDesktop) || isDesktop"
              class="text-center mt-[50px] px-2 xl:px-4 dx:px-[30px]"
            >
              <div
                class="flex justify-center items-center w-[120px] h-[120px] border-2 border-[#8DB230] rounded-full mx-auto"
              >
                <img
                  :src="userInfo?.avatar"
                  alt=""
                  srcset=""
                  class="w-[110px] h-[110px]"
                />
              </div>
              <div class="text-[#8DB230] font-bold text-2xl">
                {{ userInfo?.firstName }} {{ userInfo?.lastName }}
              </div>
              <div class="text-[#656565] text-base">
                <p>{{ userInfo?.email }}</p>
                <p>{{ userInfo?.phone }}</p>
              </div>
              <div class="pt-[70px]">
                <div
                  v-for="personalSettings in personalSettingsTab"
                  :key="personalSettings.id"
                  class="rounded-md text-xl cursor-pointer"
                  :class="
                    currentActiveTab === personalSettings.id
                      ? 'text-[#8DB230] bg-[#E8EBED]'
                      : 'text-[#656565]'
                  "
                  @click="selectCurrentTab(personalSettings.id)"
                >
                  <NuxtLink
                    :to="`/${personalSettings.slug}`"
                    class="flex space-x-5 px-3 md:px-5 lg:px-2 xl:px-4 dx:px-5 py-4"
                  >
                    <component
                      :is="personalSettings.image"
                      class="w-6 h-6"
                      :fill="
                        currentActiveTab === personalSettings.id
                          ? '#8DB230'
                          : '#656565'
                      "
                    />
                    <p class="whitespace-nowrap">
                      {{ personalSettings.title }}
                    </p>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div
            class="px-3 md:px-8 lg:px-4 xl:px-14 pb-20 scroll overflow-y-auto"
            :class="!isDesktop ? 'w-full' : 'w-2/3'"
            @click="handleMenuBar()"
          >
            <NuxtPage />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
<style lang="scss" scoped>
.mobileMenu {
  box-shadow: 0px 1px 11px rgb(44 43 43 / 84%);
  // box-shadow: 0px 3px 5px #2228314c;
}
.mainBody {
  @apply bg-white h-full overflow-hidden;
  box-shadow: 2px 2px 4px #2e2b2b29;
  border-radius: 20px;
}
.headerShape {
  @apply w-full h-10 text-center text-white text-xl font-bold flex flex-col justify-center;
  background: #8db230 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 5px #2228314c;
  border-radius: 20px 20px 0px 0px;
}
.scroll {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-color: #8db230 #ececec; /* Firefox 64 */
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
    background: #8db230;
    border-radius: 5px;
  }
}
</style>
