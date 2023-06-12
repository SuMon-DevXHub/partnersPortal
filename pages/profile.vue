<script setup lang="ts">
import AccountSecurityIcon from "~/components/base/icon/AccountSecurityIcon.vue";
import PasswordIcon from "~/components/base/icon/PasswordIcon.vue";
import PersonalInformationIcon from "~/components/base/icon/PersonalInformationIcon.vue";
import SocialProfileIcon from "~/components/base/icon/SocialProfileIcon.vue";

const currentActiveTab = ref(0);

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

onMounted(() => {
  selectCurrentTab(personalSettingsTab.value[0].id);
});

const selectCurrentTab = (id: number) => {
  currentActiveTab.value = id;
};
</script>
<template>
  <NuxtLayout name="home">
    <div class="p-[30px] bg-[#F1F2F6]">
      <div class="flex flex-col mainBody">
        <div class="headerShape">Personal Information</div>
        <div class="flex w-full h-full">
          <div
            class="w-[30%] border-r-4 border-[#8DB230] leftWrapper px-[30px]"
          >
            <div class="text-center">
              <div><img src="" alt="" srcset="" /></div>
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
                    class="flex space-x-5 px-5 py-4"
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
                    <p>{{ personalSettings.title }}</p>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="w-[70%] px-14 pb-20 scroll overflow-y-scroll">
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
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
