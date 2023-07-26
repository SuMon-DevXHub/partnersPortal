<script setup lang="ts">
import { vMaska } from "maska";

// types
export interface PhoneNumber {
  id?: string;
  placeHolder?: string;
  errorMessage?: Array<any>;
  error?: boolean;
  color?: string;
  background?: string;
  inputClasses?: string;
  processing?: boolean;
  modelValue?: string;
}

interface CountryCode {
  code: string;
  value: string;
}

// props
withDefaults(defineProps<PhoneNumber>(), {
  id: "phone-num-input",
  placeHolder: "xxx xxx xxxx",
  errorMessage: () => [],
  error: false,
  color: "#F3A026",
  background: "#fff",
  inputClasses: "",
  processing: false,
  modelValue: "",
});

// refs
const countryCode = ref<string>("+1");
const toggleSelect = ref<boolean>(false);
const countryCodes = ref<CountryCode[]>([
  { code: "+1", value: "+1" },
  // { code: "+880", value: "+880" },
]);

// methods
const { errorMessages } = useInputValidations();
</script>

<template>
  <div
    class="phone-number-input"
    :style="{ '--color': color, '--background': background }"
  >
    <div class="input-wrapper">
      <select
        v-model="countryCode"
        class="country-input h-9 self-center"
        @click="toggleSelect = !toggleSelect"
        @focusin="toggleSelect = true"
        @focusout="toggleSelect = false"
        @change="$emit('countryCode', countryCode)"
      >
        <optgroup label="Select Country">
          <option
            v-for="(option, index) in countryCodes"
            :key="index"
            :value="option.value"
          >
            {{ option.code }}
          </option>
        </optgroup>
      </select>
      <BaseIconRightArrow
        class="w-4 h-full select-toggle transition-all duration-500 ease-in-out"
        :class="toggleSelect ? 'rotate-180' : 'rotate-0'"
      />

      <input
        :id="id"
        type="tel"
        v-maska
        data-maska="###-###-####"
        class="number-input w-full p-2 h-auto rounded-tr-full rounded-br-full outline-none"
        :class="inputClasses"
        :placeHolder="placeHolder"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :disabled="processing"
      />
    </div>
    <div v-if="error" class="error text-sm text-left text-red-900">
      <span v-for="error in errorMessage" :key="error.$uid">
        {{ errorMessages(error, modelValue) }}
      </span>
    </div>
    <slot name="sendcode" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/base/input/phoneNumber.scss";
</style>
