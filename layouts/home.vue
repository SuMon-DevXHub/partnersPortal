<script setup>
import { storeToRefs } from "pinia";
import { useSidebarStore } from "~/stores/the-sidebar";
import { useFooterStore } from "~/stores/the-footer";
import { useProfileStore } from "~/stores/the-profile";
import { usePaymentStore } from "~/stores/payment";

// pinia
const { isSqueeze } = storeToRefs(useSidebarStore());
const { setIsShowFooter } = useFooterStore();
const { setIsShowProfile } = useProfileStore();
const { setShowPaymentModal, setShowBillingInfoModal } = usePaymentStore();

const $config = useRuntimeConfig();
const { $initMap } = useNuxtApp();
const payment = ref(null);

useHead(() => ({
  script: [
    {
      hid: "google_map",
      async: true,
      defer: true,
      src: `https://maps.googleapis.com/maps/api/js?key=${$config.public.googleMapKey}&libraries=places&callback=$initMap`,
      body: true,
      type: "text/javascript",
    },
  ],
}));
</script>

<template>
  <div class="w-full h-screen overflow-hidden bg-ash-1000 relative">
    <TheHeader />
    <div class="flex w-full md:h-[calc(100%-62px)] h-[calc(100%-52px)]">
      <LazyTheSidebar />
      <div
        class="w-full h-full"
        :class="
          isSqueeze
            ? 'transition-all duration-500 ease-in-out delay-500 md:pl-[200px]'
            : 'transition-all duration-500 ease-in-out delay-100 md:pl-26'
        "
        @click.stop="
          setIsShowFooter(false),
            setIsShowProfile(false),
            setShowPaymentModal(false),
            setShowBillingInfoModal(false)
        "
      >
        <slot />
      </div>
    </div>
    <TheFooter />
    <TheProfile />
    <AddNewCard />
    <BillingInfoSideBar />
  </div>
</template>

<style lang="scss">
.vc-home {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #ddccbb;
  --vc-accent-200: #dcc3ab;
  --vc-accent-300: #d7b99c;
  --vc-accent-400: #cb9d6f;
  --vc-accent-500: #e1a365;
  --vc-accent-600: #e4801d;
  --vc-accent-700: #e4801d;
  --vc-accent-800: #e4801d;
  --vc-accent-900: #e4801d;
}
.vc-archive {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #b9bdaf;
  --vc-accent-200: #dce0d2;
  --vc-accent-300: #b8c1a1;
  --vc-accent-400: #aabc7d;
  --vc-accent-500: #9dbd4d;
  --vc-accent-600: #8db230;
  --vc-accent-700: #8db230;
  --vc-accent-800: #8db230;
  --vc-accent-900: #8db230;
}
.vc-search {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #e0f2fe;
  --vc-accent-200: #e1e1e8;
  --vc-accent-300: #acadc5;
  --vc-accent-400: #b0b1c6;
  --vc-accent-500: #9193ba;
  --vc-accent-600: #7d80bd;
  --vc-accent-700: #7d80bd;
  --vc-accent-800: #7d80bd;
  --vc-accent-900: #7d80bd;
}
</style>
