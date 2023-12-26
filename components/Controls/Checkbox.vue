<template>
  <label class="checkbox__label"
         :class="{'checkbox__label--error': error}">
    <input class="checkbox" type="checkbox" :checked="modelValue"
           @change="$emit('update:modelValue', $event.target.checked)"/>
    <span class="checkbox__custom"></span>
    <span class="checkbox__text"
          v-html="title"></span>
  </label>
</template>
<script setup lang="ts">
defineEmits(['update:modelValue'])
const props = defineProps<{
  title: string
  privacy?: boolean
  error?: boolean
  modelValue?: boolean,
}>()


</script>