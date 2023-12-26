<template>
  <div class="default__select-wrapper">
    <select class="default__select" v-model="selectValue">
      <option :value="option"
              v-for="option in options">
        {{ option.name || option.title || option }}
      </option>
    </select>
    <nuxt-icon name="arrow-select"/>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['select'])
const props = defineProps<{
  title: string
  options: any
  value: any
}>()
const selectValue = computed({
  get: () => props.value || props.title,
  set: (value) => emit('select', value)
})
</script>