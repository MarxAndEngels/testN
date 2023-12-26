<template>
  <div class="container">
    <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
    <h1 class="heading heading--h1">
      {{ seoTags.title }}
    </h1>
    <Folder/>
    <Catalog/>
  </div>
</template>

<script setup lang="ts">
import Folder from "~/components/Folder/index.vue";
import Catalog from "~/components/Catalog/Catalog.vue";

const route = useRoute()
const marks = useSiteConfig().catalog
const folders = marks.find(item => item.slug === route.params.mark)?.folders
import {renderSeoTemplate} from "~/composables/seo";
import Crumbs from "~/components/Crumbs/index.vue";
import {useSiteConfig} from "~/store/siteConfig";
import ActionsMark from "~/components/Actions/Mark.vue";
import CatalogFolders from "~/components/Catalog/CatalogFolders.vue";
import ListMarks from "~/components/List/Marks.vue";
import ListFolders from "~/components/List/Folders.vue";

definePageMeta({
  validate: async (route) => {
    let mark = useSiteConfig().catalog.find(item => item.slug === route.params.mark)
    let folder = mark?.folders.find(item => item.slug === route.params.folder)
    if (mark) {
      return !!folder;
    } else return false
  }
})

const seoTags = renderSeoTemplate('new.folder', {
  mark: marks.find(item => item.slug === route.params.mark),
  folder: folders?.find(item => item.slug === route.params.folder)
})

</script>