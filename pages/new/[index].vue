<template>
  <div class="container">
    <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
    <h1 class="heading heading--h1">
      {{ seoTags.title }}
    </h1>
    <ListMarks/>
    <Catalog/>
  </div>
</template>

<script setup lang="ts">
import Catalog from "~/components/Catalog/Catalog.vue";
import ListMarks from "~/components/List/Marks.vue";
import Filters from "~/components/Filters";
import BannersCredit from "~/components/Banners/Credit.vue";
import {computed} from "#imports";
import {useCatalog} from "~/store/catalog";

const catalogMenu = computed(() => useCatalog().catalogMenu)


import {renderSeoTemplate} from "~/composables/seo";
import Crumbs from "~/components/Crumbs/index.vue";

const seoTags = renderSeoTemplate('new.catalog')
</script>