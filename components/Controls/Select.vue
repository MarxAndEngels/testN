<template>
  <client-only>
    <div class="default__select-wrapper default__select-wrapper--mobile">
      <select class="select--mobile "
              v-model="selectValue">
        <option :value="title">
          {{ title }}
        </option>
        <option :value="option"
                v-for="option in options">
          {{ option.name || option.title || option }}
        </option>
      </select>
      <nuxt-icon name="select-arrow"/>
    </div>


    <div tabindex="1" @focusout="outsideClick" class="select select--desktop" @click="selectClick">
      <div class="filter__select-data">
        <span>{{ currentTitle }}</span>
      </div>
      <nuxt-icon name="arrow-select"/>
      <div class="select__options" :class="{'select__options--open':isOpen}">
        <div @click.prevent="optionClick(option)" class="select__option" v-for="option in options">
          {{ option.title }}
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import {ref} from "#imports"

const props = defineProps<{
  title: string
  options: any
  value: any
  type: string
  hasAlphabet?: boolean
}>()

let isOpen = ref<boolean>(false)
const selectValue = computed({
  get: () => props.value || props.title,
  set: (value) => emit('select', {option: value, type: props.type})
})
const selectClick = async () => {
  if (props.options?.length) {
    isOpen.value = !isOpen.value
  }
}
const outsideClick = async () => {
  isOpen.value = false
}
const emit = defineEmits(['select'])

const optionClick = (value: any) => {
  emit('select', {option: value, type: props.type})
}


const currentTitle = computed(() => {
  if (props.value) {
    return props.value?.title || props.value?.name || props.value?.value || props.value
  } else {
    return props.title
  }
})
const alphabetOptions = computed(() => {
  let alphabetMarks = props.options?.map((item: any) => item?.title[0])
  alphabetMarks = [...new Set(alphabetMarks)].sort()
  return alphabetMarks
})

</script>
