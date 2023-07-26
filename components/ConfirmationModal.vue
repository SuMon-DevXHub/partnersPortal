<script setup lang="ts">
// Interface
interface ConfirmationModalProps {
  show?: boolean;
  processing?: boolean;
  message?: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  topExitBtnColor?: string;
  modalFromPayment?: boolean;
}
// Props
withDefaults(defineProps<ConfirmationModalProps>(), {
  show: false,
  processing: false,
  message: "This action can't be undone, and you will be unable to recover.",
  title: "Are you sure to delete this?",
  confirmBtnText: "Delete",
  cancelBtnText: "Cancel",
  topExitBtnColor: "text-white",
  modalFromPayment: false,
});
// Emits
const emit = defineEmits(["cancel", "delete"]);
// Methods
const cancel = () => {
  emit("cancel");
};
const destroy = () => {
  emit("delete");
};
</script>

<template>
  <div
    v-if="show"
    class="font-sans antialiased fixed md:bottom-0 bottom-1/3 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center transition-all z-[100]"
  >
    <div class="fixed inset-0 transition-opacity" @click.stop="cancel">
      <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
    </div>

    <div
      class="bg-[#171d26] rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
    >
      <div class="absolute top-2 right-2 px-4">
        <ClientOnly>
          <fa
            class="text-2xl cursor-pointer"
            :class="topExitBtnColor"
            :icon="['fas', 'times']"
            @click="cancel"
          />
        </ClientOnly>
      </div>
      <div class="md:px-4 md:py-7 p-6 pb-4">
        <div class="flex items-center flex-col">
          <div
            class="flex h-15 w-12 rounded-full sm:mx-0 sm:h-[60px] sm:w-[60px] sm:mb-5"
          >
            <BaseIconModalQuestion class="w-full" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:text-center">
            <h3 class="text-lg leading-6 font-medium text-white">
              {{ title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-white opacity-50">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!modalFromPayment"
        class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center sm:mb-5"
      >
        <span class="flex w-full rounded-md shadow-sm sm:ml-3.5 sm:w-auto">
          <button
            type="button"
            class="relative w-full sm:w-[152px] h-10 py-2 px-4 rounded-full border-0 outline-none focus:outline-none text-base setup text-white inline-flex justify-center items-center leading-6 font-bold shadow-sm bg-[#A22A2A]"
            :disabled="processing"
            @click="destroy"
          >
            <span>{{ confirmBtnText }}</span>
            <ClientOnly>
              <fa
                v-if="processing"
                class="absolute right-5 text-white font-bold animate-spin"
                :icon="['fas', 'spinner']"
              />
            </ClientOnly>
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            type="button"
            class="w-full sm:w-[152px] h-10 py-2 px-4 rounded-full border-2 border-white outline-none focus:outline-none text-base setup text-white inline-flex justify-center items-center leading-6 font-bold shadow-sm"
            @click="cancel"
          >
            {{ cancelBtnText }}
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
