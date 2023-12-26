<template>
  <div class="list__marks-wrapper">
    <div class="list list__marks">
      <nuxt-link class="list__tab list__tab--mark" @click.native="$emit('click')" :to="`/new/${item.slug}`"
        :title="item.title" :class="{ 'list__tab--active': $route.params.mark === item.slug }"
        v-for="item in sortedMarks" :key='item.id'>
        <nuxt-icon class="list__tab_icon" :name="`emblems/${item.slug}`" />
        <div class="list__tab_wrapper">
        <span class="list__tab-name">{{ item.title }}</span>
        <span class="list__tab-descr">Моделей {{ item.folders.length }}</span>
       </div>


      </nuxt-link>
    </div>
    <div class="button button--more" v-if="!modal" @click="full = !full">
      {{ full ? 'Показать меньше' : 'Показать больше' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteConfig } from "~/store/siteConfig";
import { CatalogType } from "~/apollo/queries/siteConfig";

const emit = defineEmits(["click"]);
const props = defineProps<{
  modal?: boolean;
}>();
const marks = useSiteConfig().catalog;
// const sortedMarks = computed(() => {
//   //Сортировка по алфавиту
//   return marks.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
// })

let full = ref<boolean>(false)

const sortedMarks = computed(() => {
  //Сортировка по алфавиту
  if (full.value) {
    return marks.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  } else {
    return marks.filter(mark => mark.priority)?.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  }
})


</script>