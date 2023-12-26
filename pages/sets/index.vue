<template>
  <div class="section section--margin-40">
    <div class="container">
      <Filters type="new" class="catalog__filters" :class="{'catalog__filters--hidden':catalogMenu}"/>
      <h1 class="heading heading--h1 heading--h1-primary heading--h1-primary--opacity">
        {{ seoTags.h1 }}
      </h1>
    </div>
    <div class="container">
      <ListMarks/>
    </div>
    <SectionSets/>
  </div>
  <div class="section section--margin-40">

    <BannersCredit/>
    <SectionPromotions/>
  </div>
</template>

<script setup lang="ts">
import ListMarks from "~/components/List/Marks.vue";
import BannersCredit from "~/components/Banners/Credit.vue";
import SectionServices from "~/components/Section/Services.vue";
import {computed} from "#imports";
import {useCatalog} from "~/store/catalog";

const catalogMenu = computed(() => useCatalog().catalogMenu)


import {renderSeoTemplate} from "~/composables/seo";
import Filters from "~/components/Filters/index.vue";

const seoTags = renderSeoTemplate('new.sets')
</script>