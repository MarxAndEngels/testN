<template>
  <div class="container">
    <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
    <h1 class="heading heading--h1">
      {{ seoTags.title }}
    </h1>
    <BannersCredit v-if="isMobile"/>
    <div class="grid reverse">
      <div class="grid__form">
        <FormCredit/>
      </div>
      <div class="grid__text">
        <FormFsspp/>
        <FormSteps/>
        <div class="form__text">
          <p class="text__p">
            Благодаря нашим кредитным программам Вы сможете наслаждаться автомобилем уже сегодня без первоначального
            взноса.
          </p>
          <p class="text__p">
            Мы возьмем на себя подбор оптимальной кредитной программы и оформление сопутствующих документов. Вам
            остается лишь выбрать подходящий автомобиль и заполнить кредитную заявку для предварительного одобрения.
          </p>
          <p class="text__p">
            После звонка кредитного эксперта приезжайте в автоцентр, пробуйте понравившийся автомобиль в рамках
            бесплатного тест-драйва и оформляйте автокредит прямо в салоне без необходимости обращения в отделение
            банка-партнера.
          </p>
        </div>
        <BannersCredit v-if="isDesktop"/>
      </div>
    </div>

    <SectionBanks/>

  </div>
</template>

<script setup lang="ts">
import BannersCredit from '~/components/Benefits/Credit.vue'
import FormCredit from '~/components/Form/Credit.vue'
import FormFsspp from '~/components/Form/Fsspp.vue'
import FormSteps from '~/components/Form/Steps.vue'
import {scrollToElement} from "~/helpers/scroll";
import {onMounted} from "vue";
import {definePageMeta} from '#imports'
import {renderSeoTemplate} from "~/composables/seo";
import {useRoute} from "vue-router";
import Crumbs from "~/components/Crumbs/index.vue";
import {useSort} from "~/store/sort";

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

const stateSort = useSort()

stateSort.setSort(null)


const seoTags = renderSeoTemplate(`credit-${route.params.category}`)
</script>