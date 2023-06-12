<script setup>
import { storeToRefs } from "pinia";
import { useSidebarStore } from "~/stores/the-sidebar";
// pinia
const { isSqueeze } = storeToRefs(useSidebarStore());
</script>

<template>
  <div class="w-full h-screen overflow-hidden bg-ash-1000">
    <div class="flex w-full h-full">
      <div class="w-26 h-full relative">
        <LazyTheSidebar />
      </div>
      <div
        class="w-auto h-full flex-grow"
        :class="
          isSqueeze
            ? 'transition-all duration-500 ease-in-out delay-500 ml-26'
            : 'transition-all duration-500 ease-in-out delay-100 ml-0'
        "
      >
        <slot />
      </div>
    </div>
  </div>
</template>
