<script setup lang="ts"></script>

<template>
  <div class="landing min-h-screen pt-26 relative">
    <img class="w-48 mx-auto" src="~/assets/img/logo-full.png" alt="" />
    <h1 class="text-3xl md:text-[50px] text-center pt-[152px] text-white">
      Partner Portal Program
    </h1>
    <AuthLogin class="absolute top-0 right-0"/>
  </div>
</template>

<style scoped>
.landing {
  background-image: url(~/assets/img/bacground.webp);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
