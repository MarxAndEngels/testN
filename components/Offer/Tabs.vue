<template>
  <div class="offer__tabs">
    <div class="offer__tabs-line">
      <div class="offer__tabs-item"
           @click="activeTab = tab.slug"
           :class="{'offer__tabs-item--active':tab.slug === activeTab}"
           v-for="tab in tabs">
        {{ tab.name }}
      </div>
    </div>
    <div class="offer__tabs-content">
      <component :is="component" :tech="currentTech" view="inline" :complectation="complectation"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import Tech from '~/components/Tech/index.vue'
import {TechType} from '~/components/Tech/index.vue'
import OfferComplectation from '~/components/Offer/Complectation.vue'
import {OfferComplectationType} from "~/apollo/queries/new/newOffer";

const props = defineProps<{
  currentTech: TechType;
  complectation: OfferComplectationType;
}>();
const activeTab = ref<string>('tech');
const tabs = [
  {
    slug: 'tech',
    name: 'Характеристики',
    component: Tech
  },
  {
    slug: 'complectation',
    name: 'Комплектация',
    component: OfferComplectation
  }
]
const component = computed(() => {
  return tabs.find(tab => tab.slug === activeTab.value)?.component
})
</script>

