<template>
  <div class="list list__folders">
    <div class="list__title">
      Модели:
    </div>
    <nuxt-link
        class="list__tab"
        :to="`/new/${route.params.mark}/${folder.slug}`"
        v-for="folder in folders"
        :key="folder.id">
      <div class="list__tab-name">{{ folder.title }}</div>
<!--      <div class="list__tab-number">{{ folder.offers_count }}</div>-->
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";

const route = useRoute()
const marks = useSiteConfig().catalog
const folders =
    marks.find(item => item.slug === route.params.mark)?.folders || []

</script>