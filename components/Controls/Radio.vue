<template>
  <div class="radio">
    <div class="radio-title">
      {{ title }}
    </div>
    <div class="radio-elements">
      <div class="radio-element" v-for="item in options"
           :class="{'radio-element--active':item?.slug === value?.slug, 'radio-element--disabled':!item.active}"
           @click="$emit('changeRadio', item)">
        {{ item.title }}
      </div>
    </div>
    <div :style="gradientStyle" class="radio-elements-line"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  options: any
  value: any
}>()


const gradientStyle = computed(() => {
  //если 2 элемена и выбран 1ый
  if (props.options.length === 2) {
    if (props.options.findIndex((item: any) => item === props.value) === 0) {
      return {background: 'linear-gradient(90deg, #416388, #BED0E8)'}
    } else {
      return {background: 'linear-gradient(90deg, #BED0E8, #416388)'}
    }
  } else if (props.options.length === 3) {
    if (props.options.findIndex((item: any) => item === props.value) === 0) {
      return {background: 'linear-gradient(90deg, #416388, #BED0E8)'}
    } else if (props.options.findIndex((item: any) => item === props.value) === 1) {
      return {background: 'radial-gradient(circle, #416388 0%, #BED0E8 100%)'}
    } else {
      return {background: '#BED0E8'}
    }
  }
})


</script>
