<template>
  <div class="container">
    <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
    <h1 class="heading heading--h1">
      {{ seoTags.title }}
    </h1>
    <div class="grid reverse">
      <div class="grid__form">
        <FormExchange/>
      </div>
      <div class="grid__text">
        <FormFsspp/>
        <FormSteps/>
        <div class="form__text">
          <p class="text__p">
            Услуга Trade-In предполагате обмен Вашего старого автомобиля на более новый. Обмен позволяет сэкономить время на времязатратной продаже своего авто, и обновить автомобиль за пару часов.
          </p>
          <p class="text__p">
            Оценка вашего автомобиля будет на 100% рыночной, всю сумму можно использовать для покупки нового автомобиля.
            Для обмена автомобиля по Trade-In Вам потребуются только паспорт и водительское удостоверение.
          </p>
        </div>
      </div>
    </div>
    <SectionBanks v-if="isDesktop"/>
  </div>
</template>

<script setup lang="ts">
import FormExchange from '~/components/Form/Exchange.vue'
import FormFsspp from '~/components/Form/Fsspp.vue'
import FormSteps from '~/components/Form/Steps.vue'
import {scrollToElement} from "~/helpers/scroll";
import {onMounted} from "vue";
import {definePageMeta} from '#imports'
import {renderSeoTemplate} from "~/composables/seo";
import {useRoute} from "vue-router";
import Crumbs from "~/components/Crumbs/index.vue";

const {isMobile, isDesktop} = useDevice();
const route = useRoute()

definePageMeta({
  validate: async (route) => {
    // return route.params.category === 'u' || route.params.category === 'n';
    return route.params.category === 'n';
  }
})

onMounted(() => {
  if (route.query.category) {
    scrollToElement('#form', 0)
  }
})


const seoTags = renderSeoTemplate(`exchange-${route.params.category}`)
</script>