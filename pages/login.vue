<script setup>
import { useHeaderStore } from "~/stores/the-header";
definePageMeta({
  middleware: ["redirect-to-login"],
});
const { setIsShowLoginModal } = useHeaderStore();
const hideAllModal = () => {
  setIsShowLoginModal(false);
};

</script>

<template>
  <div class="landing min-h-screen pt-26 relative" @click.stop="hideAllModal()">
    <img class="w-48 mx-auto" src="~/assets/img/logo-full.png" alt="" />
    <h1
      class="text-3xl md:text-[50px] text-center pt-[100px] md:pt-[152px] text-white"
    >
      Partner Portal Program
    </h1>
    <p
      class="text-2xl text-white text-center pt-10 px-8 md:px-0 max-w-[540px] mx-auto"
    >
      Sharp Archive provides an unparalleled solution for social media
      archiving, risk mitigation, and adherence to regulations.
    </p>
    <AuthLogin class="absolute top-0 right-0" />
  </div>
</template>

<style scoped>
.landing {
  background-image: url(https://cdn.sharparchive.com/files/img/landing_bg_img_logo1.27d014c.png);
  background-color: #222831;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
