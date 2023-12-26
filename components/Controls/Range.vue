<template>
  <div class="range">
    <div class="range__inputs">
      <input @change="changeFrom" class="range__input" type="tel" :value="fromValueInput">
      <input @change="changeTo" class="range__input" type="tel" :value="toValueInput">
    </div>
<!--    <Slider :format="format" v-model="sliderModal" :step="step" :min="from" :max="to"-->
<!--            tooltip-position="bottom"/>-->
  </div>
</template>
<script setup lang="ts">
import Slider from '@vueform/slider'
import {numberFormat} from "~/helpers/filters";

const emit = defineEmits(['change'])
const props = defineProps<{
  from: number
  fromValue: number
  to: number
  toValue: number
  prefix: string
  step: number
}>()

const fromValueInput = computed(() => {
  return numberFormat(Number(props.fromValue)) + ' ₽'
})
const toValueInput = computed(() => {
  return numberFormat(Number(props.toValue)) + ' ₽'
})
const changeFrom = (event: any) => {
  emit('change', {value: event.target.value.replace(/\D/g, ''), type: 'from'})
}
const changeTo = (event: any) => {
  emit('change', {value: event.target.value.replace(/\D/g, ''), type: 'to'})
}

const format = (value: any) => {
  return numberFormat(Number(value)) + ' ₽'
}



</script>