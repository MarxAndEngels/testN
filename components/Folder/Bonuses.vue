<template>
  <div class="folder__bonuses bonuses">
    <div class="bonuses__price">
      Ваша выгода <span> {{ numberFormat(difference - dopSum) }} ₽</span>
    </div>
    <div class="bonuses__line">
      <div class="bonuses__item"
           v-for="bonus in bonuses"
           @click="bonus.chosen = !bonus.chosen"
           :class="{'bonuses__item--active':bonus.chosen}">
        <div>
          <div class="bonuses__item-name">{{ bonus.title }}</div>
          <div class="bonuses__item-price"> - {{ numberFormat(difference * bonus.percent) }} ₽</div>
        </div>
        <div class="bonuses__item-circle"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {numberFormat} from "~/helpers/filters";

const props = defineProps<{
  difference: number;
}>();

const bonuses = ref([
  {
    type: 'credit',
    title: 'Автокредит',
    chosen: true,
    percent: .45
  },
  {
    type: 'exchange',
    title: 'Trade-In',
    chosen: true,
    percent: .3
  },
  {
    type: 'gos',
    title: 'Госпрограмма',
    chosen: true,
    percent: .25
  },

])

const dopSum = computed(() => {
  let sum = 0
  bonuses.value.map(bonus => {
    if (bonus.chosen) {
      sum += props.difference * bonus.percent
    }
  })
  return props.difference - sum
})

const emit = defineEmits(["changeBonuses"]);

onMounted(() => {
  emit('changeBonuses', dopSum.value)
})
watch(dopSum, () => {
  emit('changeBonuses', dopSum.value)
})
</script>
