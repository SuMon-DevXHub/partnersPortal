<script setup>
const props = defineProps({
  radioOptions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="custom_radio flex">
    <TransitionGroup name="inout">
      <div v-for="radio in radioOptions" :key="radio.id">
        <input
          :checked="radio.id === 'male' ? true : false"
          :id="radio.id"
          type="radio"
          value=""
          name="radio-group"
          @click="$emit('currentRadioValue', radio.radioValue)"
        />
        <label
          :for="radio.id"
          class="text-sm font-medium text-[#656565] dark:text-gray-300"
          >{{ radio.radioValue }}</label
        >
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.inout-enter-active,
.inout-leave-active {
  transition: all 0.5s ease-in-out;
}
.inout-enter-from,
.inout-leave-to {
  opacity: 0;
  scale: 0.5;
}
.custom_radio input[type="radio"] {
  display: none;
}
.custom_radio input[type="radio"] + label {
  @apply leading-[2.5em] md:leading-[5em];
  position: relative;
  padding-left: 2em;
  margin-right: 2em;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.custom_radio input[type="radio"] + label:before,
.custom_radio input[type="radio"] + label:after {
  content: "";
  position: absolute;
  top: -3px;
  left: 0;
  width: 24px;
  height: 24px;
  text-align: center;
  color: #8db230;
  border-radius: 50%;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.custom_radio input[type="radio"] + label:before {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0.2em #e8ebed, inset 0 0 0 1em #e8ebed;
}
.custom_radio input[type="radio"] + label:hover:before {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0.3em #e8ebed, inset 0 0 0 1em #c6c6c6;
}
.custom_radio input[type="radio"]:checked + label:before {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0.5em #8db230, inset 0 0 0 0.5em #e8ebed;
}
</style>
