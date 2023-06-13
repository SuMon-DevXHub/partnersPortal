<script setup lang="ts">
// types
export interface SelectInput {
  id?: string;
  label?: string;
  labelColor?: string;
  options?: Array<any>;
  placeHolder?: any;
  placeHolderDisabled?: boolean;
  textInput?: string;
  errorMessage?: Array<any>;
  error?: boolean;
  color?: string;
  caretColor?: string;
  caretBg?: string;
  background?: string;
  modelValue?: string;
  classStyleName?: string;
  toggleButton?: string;
}
// props
const props = withDefaults(defineProps<SelectInput>(), {
  id: "",
  label: "",
  labelColor: "",
  options: () => [],
  placeHolder: "",
  placeHolderDisabled: false,
  textInput: "",
  errorMessage: () => [],
  error: false,
  color: "#4D4D4D",
  caretColor: "text-white",
  caretBg: "",
  background: "#fff",
  modelValue: "",
  classStyleName: "",
  toggleButton: "",
});
// data or state
const toggleSelect = ref<boolean>(false);
const toggleClass = ref<boolean>(false);
// methods
const selectOption = () => {
  toggleSelect.value = !toggleSelect.value;
  toggleClass.value = true;
};
// watcher
watch(
  () => props.modelValue,
  () => {
    toggleSelect.value = false;
  }
);
// methods
const { errorMessages } = useInputValidations();
</script>

<template>
  <div
    class="select-input overflow-hidden"
    :style="{
      '--color': color,
      '--background': background,
      '--caretBg': caretBg,
    }"
  >
    <label
      v-if="modelValue.length === 0"
      class="label-design"
      :class="labelColor"
      :for="id"
      >Select</label
    >
    <select
      id="selectStyleId"
      :value="modelValue"
      :style="{ '--color': color }"
      :class="[
        classStyleName,
        textInput,
        toggleSelect ? 'round-remove' : '',
        toggleClass ? '' : 'selectStyle',
        modelValue === 'Select' ? 'showSelect' : '',
      ]"
      v-bind="$attrs"
      tabindex="0"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @click="selectOption"
      @focusout="toggleSelect = false"
    >
      <option
        v-if="placeHolder"
        :class="[modelValue === 'Select' ? 'showSelect' : '']"
        :disabled="placeHolderDisabled"
        :selected="placeHolder"
        class="placeHolder"
      >
        {{ placeHolder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="select-toggle" :class="toggleButton">
      <client-only>
        <fa
          :style="{ color: color }"
          :class="caretColor"
          :icon="['fas', toggleSelect ? 'caret-up' : 'caret-down']"
      /></client-only>
    </div>
    <div v-if="error" class="error text-sm text-red-900 md:text-left">
      <span v-for="error in errorMessage" :key="error.$uid">
        {{ errorMessages(error, modelValue) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/base/input/select.scss";
</style>
