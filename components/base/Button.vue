<script setup lang="ts">
import { ButtonHTMLAttributes } from "nuxt/dist/app/compat/capi";

export interface ButtonProps {
  text?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

withDefaults(defineProps<ButtonProps>(), {
  text: "",
  disabled: false,
  type: "button",
});
</script>

<template>
  <button
    class="flex justify-center items-center relative rounded-full"
    :class="disabled ? 'space-x-2' : ''"
    :disabled="disabled"
    :type="type"
  >
    <span>{{ text }}</span>
    <ClientOnly>
      <BaseIconSpinnerIcon
        v-if="disabled"
        class="absolute right-5 text-white font-bold animate-spin"
      />
    </ClientOnly>
  </button>
</template>
