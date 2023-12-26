<template>
  <label class="switch" :class="{ 'switch--active': modelValue }">
    <input
      @change="$emit('update:modelValue', $event.target.checked)"
      :checked="modelValue"
      type="checkbox"
      class="switch__checkbox"
    />
    <div class="switch__line">
      <div class="switch__item"></div>
    </div>
    <div class="switch__name">
      {{ name }}
      <span class="switch__label"> {{ label }}</span>
    </div>
    <div class="switch__text">
      {{ value }}
    </div>
  </label>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);
const props = defineProps<{
  value: string;
  name: string;
  label: string;
  modelValue: boolean;
}>();
</script>
