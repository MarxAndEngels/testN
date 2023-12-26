<template>
  <div class="section section--margin-40">
    <div class="container">
      <Filters type="new" class="catalog__filters" :class="{'catalog__filters--hidden':catalogMenu}"/>
      <h1 class="heading heading--h1 heading--h1-primary heading--h1-primary--opacity heading--h1-primary--nowrap">
        {{ seoTags.h1 }}</h1>
      <ListMarks/>
      <Catalog/>
    </div>
    <BannersCredit/>
    <SectionPromotions/>
  </div>
</template>

<script setup lang="ts">
import Catalog from "~/components/Catalog/Catalog.vue";
import ListMarks from "~/components/List/Marks.vue";
import Filters from "~/components/Filters";
import BannersCredit from "~/components/Banners/Credit.vue";
import SectionServices from "~/components/Section/Services.vue";
import {computed, definePageMeta} from "#imports";
import {useCatalog} from "~/store/catalog";
import {renderSeoTemplate} from "~/composables/seo";
import {useRoute} from 'vue-router';
import {useSiteConfig} from "~/store/siteConfig";


const route = useRoute()
const sets = useSiteConfig().sets

definePageMeta({
  validate: async (route) => {
    return !!useSiteConfig().sets.find(item => item.slug === route.params.set);
  }
})

const catalogMenu = computed(() => useCatalog().catalogMenu)


const seoTags = renderSeoTemplate('new.set', {
  set: sets.find(item => item.slug === route.params.set)
})
</script>