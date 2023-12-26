<template>
  <div class="section section--about section--margin-40">
    <div class="container">
      <h1 class="heading heading--h1-primary">{{ seoTags.h1 }}</h1>
      <p class="text__p">
        Менеджер свяжется с Вами в течение 2-3 минут.
      </p>
    </div>
    <SectionPromotions/>
  </div>
</template>
<script setup lang="ts">
import SectionServices from "~/components/Section/Services.vue";
import {renderSeoTemplate} from "~/composables/seo";
import {definePageMeta} from "#imports";

const seoTags = renderSeoTemplate('thanks')

definePageMeta({
  validate: async (route) => {
    // return route.params.category === 'u' || route.params.category === 'n';
    return route.params.category === 'n';
  }
})
</script>