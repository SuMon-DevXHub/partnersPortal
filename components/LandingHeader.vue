<script setup>
import { useHeaderStore } from "~/stores/the-header";
const { setIsShowLoginModal } = useHeaderStore();
</script>
<template>
  <div>
    <header class="min-w-full absolute top-0 z-[1]">
      <nav class="w-full flex justify-center md:justify-end py-4 md:py-2">
        <button
          class="text-white md:text-[#e4801d] hover:text-white focus:text-white bg-[#e4801d] md:bg-transparent px-4 md:px-0 rounded-full py-1 md:py-3 xl:pr-6 md:pr-3 text-lg md:text-xl items-center font-bold border-none outline-none flex"
          @click="setIsShowLoginModal(true)"
        >
          <span class="inline-block whitespace-nowrap">Log In</span>
        </button>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped></style>
