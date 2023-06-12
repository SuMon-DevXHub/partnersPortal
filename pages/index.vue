<script setup lang="ts">
const nuxtApp = useNuxtApp();

onMounted(() => {
  nuxtApp.$toast("clear");
  nuxtApp.$toast("success", {
    message: "Successfully Started",
    className: "alert_success",
  });
});
</script>

<template>
  <div>
    <h2 class="text-5xl text-center">From index page</h2>
  </div>
</template>

<style scoped></style>
