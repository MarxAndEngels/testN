<template>
  <div class="section section--about section--margin-40">
    <div class="container">
      <Crumbs :crumbs="seoTags.crumbs" />
    </div>
    <div class="container">
      <h1 class="heading heading--h1-primary heading--h1-primary--opacity">
        {{ seoTags.h1 }}
      </h1>
    </div>
    <SectionContacts />
    <SectionPromotions />
  </div>
</template>
<script setup lang="ts">
import SectionContacts from "~/components/Section/Contacts.vue";
import SectionServices from "~/components/Section/Services.vue";
import { renderSeoTemplate } from "~/composables/seo";
import Crumbs from "~/components/Crumbs/index.vue";

const seoTags = renderSeoTemplate('contacts')
</script>