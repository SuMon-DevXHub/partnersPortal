<script setup>
import { storeToRefs } from "pinia";
import { useSidebarStore } from "~/stores/the-sidebar";
// pinia
const { isSqueeze } = storeToRefs(useSidebarStore());
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
      >
        <slot />
      </div>
    </div>
  </div>
</template>
