<script setup lang="ts">
import AccountSecurityIcon from "~/components/base/icon/AccountSecurityIcon.vue";
import PasswordIcon from "~/components/base/icon/PasswordIcon.vue";
import PersonalInformationIcon from "~/components/base/icon/PersonalInformationIcon.vue";
import SocialProfileIcon from "~/components/base/icon/SocialProfileIcon.vue";

const currentActiveTab = ref(0);

const route = useRoute();

const personalSettingsTab = ref([
  {
    id: 1,
    image: PersonalInformationIcon,
    title: "Personal Information",
    slug: "profile/information",
  },
  {
    id: 2,
    image: PasswordIcon,
    title: "Password",
    slug: "profile/password",
  },
  {
    id: 3,
    image: AccountSecurityIcon,
    title: "Account Security",
    slug: "profile/security",
  },
]);

const showMenuBar = ref(false);
const windowWidth = ref(0);
const showMenuContent = ref(false);

onMounted(() => {
  if (window.innerWidth >= 1024) {
    showMenuBar.value = true;
  }
  windowWidth.value = window.innerWidth;

  selectCurrentTab(personalSettingsTab.value[0].id);
});

const selectCurrentTab = (id: number) => {
  currentActiveTab.value = id;
};

const handleMenuBar = () => {
  if (showMenuBar.value && window.innerWidth < 1024) {
    showMenuBar.value = false;
  }
};

watch(
  () => route,
  (value) => {
    if (value.name === "profile-information") {
      selectCurrentTab(personalSettingsTab.value[0].id);
    }

    if (showMenuBar.value && window.innerWidth < 1024) {
      showMenuBar.value = false;
    }
  },
  {
    deep: true,
  }
);

watch(
  () => showMenuBar.value,
  (value) => {
    if (value) {
      setTimeout(() => {
        showMenuContent.value = true;
      }, 100);
    } else {
      showMenuContent.value = false;
    }
  }
);
</script>
<template>
  <NuxtLayout name="home">
    <div class="p-4 md:p-[30px] bg-[#F1F2F6]">
      <div class="flex flex-col mainBody relative">
        <div
          class="leftWrapper transition-all duration-300 ease-in-out absolute lg:hidden mobileMenu"
          :class="[
            windowWidth < 1024 ? 'absolute bg-white h-full z-10' : '',
            showMenuBar
              ? 'w-full md:w-1/2 lg:w-1/3 md:border-r-4 border-[#8DB230]'
              : 'w-0 border-r-0',
          ]"
        >
          <div
            v-if="
              (showMenuBar && windowWidth < 1024 && showMenuContent) ||
              windowWidth >= 1024
            "
            class="text-center mt-[50px] px-2 xl:px-4 dx:px-[30px]"
          >
            <div
              class="flex justify-center items-center w-[120px] h-[120px] border-2 border-[#8DB230] rounded-full mx-auto"
            >
              <BaseIconUserImageIcon class="w-[110px] h-[110px]" />
            </div>
            <div class="text-[#8DB230] font-bold text-2xl">Jhon Smit</div>
            <div class="text-[#656565] text-base">
              <p>bob@example.com</p>
              <p>303-555-1234</p>
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
        <div class="headerShape">
          <div class="flex items-center w-full h-10">
            <div
              class="h-8 md:h-10 w-8 md:w-10 ml-4 p-1"
              @click="showMenuBar = !showMenuBar"
            >
              <BaseIconMenuIcon
                class="w-full h-full bg-white rounded-full lg:hidden"
              />
            </div>
            <p class="flex-grow self-center">Personal Information</p>
          </div>
        </div>
        <div class="flex w-full h-full">
          <div
            class="border-r-4 border-[#8DB230] leftWrapper transition-all duration-300 ease-in-out hidden lg:block"
            :class="[
              windowWidth < 1024 ? 'absolute bg-white h-full z-10' : '',
              showMenuBar ? 'w-full md:w-1/2 lg:w-1/3' : 'w-0 border-r-0',
            ]"
          >
            <div
              v-if="(showMenuBar && windowWidth < 1024) || windowWidth >= 1024"
              class="text-center mt-[50px] px-2 xl:px-4 dx:px-[30px]"
            >
              <div
                class="flex justify-center items-center w-[120px] h-[120px] border-2 border-[#8DB230] rounded-full mx-auto"
              >
                <BaseIconUserImageIcon class="w-[110px] h-[110px]" />
              </div>
              <div class="text-[#8DB230] font-bold text-2xl">Jhon Smit</div>
              <div class="text-[#656565] text-base">
                <p>bob@example.com</p>
                <p>303-555-1234</p>
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
            :class="windowWidth < 1024 ? 'w-full' : 'w-2/3'"
            @click="handleMenuBar()"
          >
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.mobileMenu {
  box-shadow: 0px 1px 11px rgb(44 43 43 / 84%);
  // box-shadow: 0px 3px 5px #2228314c;
}
.mainBody {
  @apply bg-white h-[90vh] overflow-hidden;
  box-shadow: 2px 2px 4px #2e2b2b29;
  border-radius: 20px;
}
.headerShape {
  @apply w-full h-10 text-center text-white text-xl font-bold flex flex-col justify-center;
  background: #8db230 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 5px #2228314c;
  border-radius: 20px 20px 0px 0px;
}
</style>
<!-- 
<template>
  <NuxtLayout name="home">
    <NuxtPage />
  </NuxtLayout>
</template> -->
