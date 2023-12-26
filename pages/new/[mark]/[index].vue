<template>
  <div class="container">
    <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
    <h1 class="heading heading--h1">
      {{ seoTags.title }}
    </h1>
    <ListMarks v-if="isDesktop"/>
    <ListFolders/>
    <ActionsMark/>
    <h2 class="heading heading--h2">
      Модели {{ currentMark.title }} в наличии
    </h2>
    <CatalogFolders/>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta} from '#imports'
import {renderSeoTemplate} from "~/composables/seo";
import {useSiteConfig} from "~/store/siteConfig";
import ListFolders from "~/components/List/Folders.vue";
import ActionsMark from "~/components/Actions/Mark.vue";
import CatalogFolders from "~/components/Catalog/CatalogFolders.vue";
import Crumbs from "~/components/Crumbs/index.vue";
import ListMarks from "~/components/List/Marks.vue";

const {isDesktop} = useDevice();
const route = useRoute()
const marks = useSiteConfig().catalog
const currentMark = computed(() => {
  return marks.find(item => item.slug === route.params.mark)
})

definePageMeta({
  validate: async (route) => {
    return !!useSiteConfig().catalog.find(item => item.slug === route.params.mark);
  }
})

const seoTags = renderSeoTemplate('new.mark', {
  mark: marks.find(item => item.slug === route.params.mark)
})
</script>