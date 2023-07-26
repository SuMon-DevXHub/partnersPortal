<script setup>
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/the-profile";
import { usePageColorStore } from "~/stores/pagecolor";

const { showProfile, userInfo } = storeToRefs(useProfileStore());
const { getColor } = storeToRefs(usePageColorStore());
const { setIsShowProfile } = useProfileStore();
const router = useRouter();
const { logout } = useAuth();

const profileInfo = ref({
  // image: BaseIconUserImageIcon,
  name: "Jhon Smith",
  email: "joejhonson@gmail.com",
  address: "123 Main St",
  fullAddress: "Springfield U.S.A 12345-6789",
  phone: "303-555-1234",
  partnerCode: "U8YX",
});

const logoutProcess = ref(false);
const profileLogout = async () => {
  logoutProcess.value = true;
  await logout().then((res) => {
    if (res) {
      router.replace("/");
      logoutProcess.value = false;
      setIsShowProfile(false);
    }
  });
};
</script>

<template>
  <Transition name="right-sidebar-trans">
    <div
      v-if="showProfile"
      class="profile fixed bg-[#222831] right-0 md:top-15 h-full md:px-21 p-4 md:pt-8 flex flex-col content-between scroll md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl transition-all duration-500"
    >
      <div class="content-wrapper w-full h-full relative">
        <div class="w-full h-full absolute top-0">
          <div class="h-full flex flex-wrap content-between">
            <div class="w-full">
              <div class="flex flex-row justify-between md:mt-4">
                <h2
                  :style="{ color: getColor.backgroundColor }"
                  class="xl:text-2xl md:text-xl md:font-medium text-2xl"
                >
                  Partner Profile
                </h2>
                <div
                  class="w-8 h-8 flex items-center justify-end cursor-pointer"
                  @click="setIsShowProfile(false)"
                >
                  <ClientOnly>
                    <fa
                      :style="{ color: getColor.backgroundColor }"
                      class="text-2xl font-semibold"
                      :icon="['fas', 'times']"
                    />
                  </ClientOnly>
                </div>
              </div>
              <div class="flex flex-col items-center mt-10">
                <div
                  :style="{
                    borderColor: getColor.backgroundColor,
                  }"
                  class="w-24 h-24 rounded-full border-4 flex justify-center items-center"
                >
                  <BaseIconUserImageIcon
                    v-if="userInfo && userInfo.avatar"
                    class="w-full h-full rounded-full"
                  />
                  <BaseIconDefaultProfileIcon
                    v-else
                    class="w-full h-full rounded-full"
                  />
                </div>
                <h2
                  class="text-gray-1100 xl:text-2xl md:text-xl font-bold text-2xl md:pt-6 pt-3 text-center cursor-pointer"
                >
                  <span
                    >{{ userInfo ? userInfo.firstName : "" }}
                    {{ userInfo ? userInfo.lastName : "" }}</span
                  >
                </h2>
              </div>
              <div class="md:flex hidden flex-col mt-6 cursor-pointer">
                <div>
                  <h4
                    class="text-gray-1100 xl:text-xl md:text-lg font-bold text-2xl"
                  >
                    Email
                  </h4>
                  <p
                    class="text-gray-1100 xl:text-xl md:text-lg text-xl opacity-50"
                  >
                    {{ userInfo ? userInfo.email : "" }}
                  </p>
                </div>
                <div class="mt-6">
                  <h4
                    class="text-gray-1100 xl:text-xl md:text-lg font-bold text-2xl"
                  >
                    Address
                  </h4>
                  <p
                    class="text-gray-1100 xl:text-xl md:text-lg text-xl opacity-50 break-all"
                  >
                    {{ userInfo ? userInfo.address : "" }}
                  </p>
                  <!-- <p
                    class="text-gray-1100 xl:text-xl md:text-lg text-xl opacity-50 break-all"
                  >
                    {{ profileInfo.fullAddress }}
                  </p> -->
                </div>
                <div class="mt-6">
                  <h4
                    class="text-gray-1100 xl:text-xl md:text-lg font-bold text-2xl"
                  >
                    Phone
                  </h4>
                  <p
                    class="text-gray-1100 xl:text-xl md:text-lg text-xl opacity-50"
                  >
                    {{ userInfo ? userInfo.phone : "" }}
                  </p>
                </div>
                <div class="mt-6">
                  <h4
                    class="text-gray-1100 xl:text-xl md:text-lg font-bold text-2xl"
                  >
                    Partner Code
                  </h4>
                  <p
                    class="text-gray-1100 xl:text-xl md:text-lg text-xl opacity-50"
                  >
                    {{ profileInfo.partnerCode }}
                  </p>
                </div>
              </div>

              <!-- mobile device -->
              <div class="md:hidden w-full flex flex-col mt-7 px-8">
                <div class="grid grid-cols-12 gap-6 w-full">
                  <div class="col-span-4">
                    <label
                      class="text-gray-1100 text-lg font-bold block space-y-3"
                      >Email</label
                    >
                  </div>
                  <div class="col-span-8">
                    <p
                      class="text-gray-1100 text-lg h-7 opacity-50 inline-block space-y-3"
                    >
                      {{ userInfo ? userInfo.email : "" }}
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-6 w-full mt-2">
                  <div class="col-span-4">
                    <label
                      class="text-gray-1100 text-lg font-bold inline-block space-y-3"
                      >Address</label
                    >
                  </div>
                  <div class="col-span-8">
                    <p
                      class="text-gray-1100 text-lg h-7 opacity-50 inline-block break-all space-y-3"
                    >
                      {{ userInfo ? userInfo.address : "" }}
                    </p>
                    <!-- <p
                      class="text-gray-1100 text-lg h-7 opacity-50 inline-block break-all space-y-3"
                    >
                      {{ profileInfo.fullAddress }}
                    </p> -->
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-6 w-full mt-2">
                  <div class="col-span-4">
                    <label
                      class="text-gray-1100 text-lg font-bold inline-block space-y-3"
                      >Phone</label
                    >
                  </div>
                  <div class="col-span-8">
                    <p
                      class="text-gray-1100 text-lg h-7 opacity-50 inline-block space-y-3"
                    >
                      {{ userInfo ? userInfo.phone : "" }}
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-6 w-full mt-2">
                  <div class="col-span-4">
                    <label
                      class="text-gray-1100 text-lg font-bold inline-block space-y-3"
                      >Code</label
                    >
                  </div>
                  <div class="col-span-8">
                    <p
                      class="text-gray-1100 text-lg h-7 opacity-50 inline-block space-y-3"
                    >
                      {{ profileInfo.partnerCode }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- logout button -->
            <div class="w-full">
              <div
                class="flex flex-row items-center justify-center mt-10 btn-wrapper mb-4"
              >
                <button
                  :style="{
                    backgroundColor: getColor.backgroundColor,
                  }"
                  type="submit"
                  class="w-44 py-2 text-white rounded-full border-none outline-none font-bold text-base setup"
                  :disabled="logoutProcess"
                  @click="profileLogout()"
                >
                  <div
                    class="rounded-full relative flex items-center justify-around"
                  >
                    <span>Log Out</span>
                    <ClientOnly>
                      <fa
                        v-if="logoutProcess"
                        class="absolute right-5 text-white font-bold animate-spin"
                        :icon="['fas', 'spinner']"
                      />
                    </ClientOnly>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/theprofile.scss";
</style>
