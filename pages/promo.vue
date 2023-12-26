<template>
  <div class="section section--about section--promotions section--margin-40">
    <div class="container">
      <Crumbs :crumbs="seoTags.crumbs" />
      <h1
        class="heading heading--h1-primary heading--h1-primary--opacity"
      >
        акции
      </h1>
      <p class="text__p">
        ATLAS AUTO предлагает своим клиентам только актуальные госпрограммы и действительно работающие акции. В нашем автоцентре можно гарантированно приобрести новый автомобиль, получив подарок и несколько скидок одновременно.
      </p>
    </div>
    <SectionPromotions/>
  </div>
</template>
<script setup lang="ts">
import SectionServices from "~/components/Section/Services.vue";
import BenefitsCredit from "~/components/Benefits/Credit.vue";
import Picture from "~/components/Picture/index.vue";
import { renderSeoTemplate } from "~/composables/seo";
import Crumbs from "~/components/Crumbs/index.vue";

const seoTags = renderSeoTemplate("promo");
</script>