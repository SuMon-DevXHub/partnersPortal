<script setup lang="ts">
// types
export interface TextInput {
  id?: string;
  label?: string;
  placeHolder?: string;
  name?: string;
  placeHolderClass?: string;
  textInput?: string;
  inputWrapper?: string;
  errorMessage?: Array<any>;
  error?: boolean;
  color?: string;
  background?: string;
  modelValue?: string;
  placeHolderColor?: string;
}
// props
withDefaults(defineProps<TextInput>(), {
  id: "",
  label: "",
  placeHolder: "Type something",
  name: "",
  placeHolderClass: "placeholder-orange-600 placeholder-opacity-50",
  textInput: "",
  inputWrapper: "",
  errorMessage: () => [],
  error: false,
  color: "#4D4D4D",
  background: "#fff",
  modelValue: "",
  placeHolderColor: "E4801D",
});
// methods
const { errorMessages } = useInputValidations();
</script>

<template>
  <div
    class="text-input"
    :style="{
      '--color': color,
      '--background': background,
      '--placeHolderColor': placeHolderColor,
    }"
  >
    <div class="flex space-x-4 items-center" :class="[inputWrapper]">
      <slot name="icon-before"></slot>
      <div class="w-full input_inner_wrapper">
        <label
          v-if="label"
          class="mb-1.5"
          :for="id"
          :style="{ color: color }"
          >{{ label }}</label
        >
        <input
          :id="id"
          :class="[placeHolderClass, textInput]"
          type="text"
          :name="name"
          :placeHolder="placeHolder"
          :value="modelValue"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value
            )
          "
          v-bind="$attrs"
        />
      </div>
      <slot name="icon-after"></slot>
    </div>
    <div v-if="error" class="error text-sm text-red-900">
      <span v-for="error in errorMessage" :key="error.$uid">
        {{ errorMessages(error, modelValue) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/base/input/text.scss";
</style>
