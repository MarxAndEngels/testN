<template>
  <h1 class="visually-hidden">
    {{ seoTags.h1 }}
  </h1>
  <div class="main__page">
    <div class="container container__block">
<!--      <h2 class="heading heading&#45;&#45;h2">-->
<!--        Новые автомобили-->
<!--      </h2>-->
      <CarouselMain/>
      <ListMarks/>
      <filters-main/>
      <div class="container__block">
        <h2 class="heading heading--h2">
          Последние поступления
        </h2>
        <CatalogNewHome/>
      </div>
      <div class="container__block">
        <h2 class="heading heading--h2">
          Популярные модели
        </h2>
        <CatalogFoldersHome/>
      </div>
      <div class="container__block mb-4">
        <h2 class="heading heading--h2">
          Акции и спецпредложения</h2>
        <Actions/>
      </div>
<!--      <section class="page-main__banner-promo banner-promo">-->
<!--        <div class="banner-promo__coop">-->
<!--          <div class="banner-promo__coop-wrap">-->
<!--            <div class="banner-promo__michelin"><img src="/img/promo/michelin-logo.svg" class="lazyload" alt="img">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="banner-promo__text">Получи зимнюю резину Michelin в подарок при покупке нового автомобиля!</div>-->
<!--        <div class="banner-promo__tire">-->
<!--          <picture>-->
<!--            <source type="image/webp" src="/img/promo/tire.webp">-->
<!--            <img class="lazyload" src="/img/promo/tire.webp" alt="img">-->
<!--          </picture>-->
<!--        </div>-->
<!--      </section>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import ListMarks from "~/components/List/Marks.vue";
import Actions from "~/components/Actions/index.vue";
import CarouselMain from "~/components/Carousel/Main.vue";
import CatalogNewHome from '~/components/Catalog/CatalogNewHome.vue'
import CatalogFoldersHome from '~/components/Catalog/CatalogFoldersHome.vue'
import {useSort} from "~/store/sort";

const stateSort = useSort()

stateSort.setSort(null)

const seoTags = renderSeoTemplate('index')
</script>