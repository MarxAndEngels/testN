<template>
  <div class="section section--credit section--100vh section--container">
    <Picture custom-class="section__block-image" img="/img/pages/installment/banner"/>
    <div class="container">
      <h1 class="heading heading--h1 heading--h1-primary" v-html="seoTags.h1"></h1>
      <div class="heading heading__dop">
        0% от автоцентра
      </div>
      <p class="block__text">
        Что делает нас успешнее и прогрессивнее? Это уникальность и продуманность автопарка – у нас собраны наиболее
        востребованные и удачные модели самых разнообразных марок.
      </p>
      <BenefitsInstallment class=""/>
    </div>
  </div>
  <div class="section section--margin-40" id="form">
    <div class="container">
      <div class="section__form">
        <FormInstallment/>
      </div>
    </div>
    <SectionBanks/>
    <BannersCredit/>
  </div>
</template>

<script setup lang="ts">
import Picture from "~/components/Picture/index.vue";
import BenefitsCredit from "~/components/Benefits/Credit.vue";
import FormInstallment from "~/components/Form/Installment.vue";
import BannersCredit from "~/components/Banners/Credit.vue";
import {scrollToElement} from "~/helpers/scroll";
import {onMounted} from "vue";
import {definePageMeta} from '#imports'
import {renderSeoTemplate} from "~/composables/seo";
import {useRoute} from "vue-router";

const route = useRoute()

// definePageMeta({
//   validate: async (route) => {
//     // return route.params.category === 'u' || route.params.category === 'n';
//     return route.params.category === 'n';
//   }
// })

onMounted(() => {
  if (route.query.category) {
    scrollToElement('#form', 0)
  }
})


const seoTags = renderSeoTemplate(`installment`)
</script>