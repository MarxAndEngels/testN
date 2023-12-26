<template>
  <h1 class="visually-hidden">
    Автоцентр Атлас Авто — официальный дилер в Москве
  </h1>
  <div class="main__page">
    <div class="container">
      <h2 class="heading heading--h2">
        Новые автомобили
      </h2>
      <CarouselMain/>
      <ListMarks/>
      <filters-main/>
      <div class="container__block">
        <h2 class="heading heading--h2">
          Акции и спецпредложения</h2>
        <Actions/>
      </div>
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
      <section class="page-main__banner-promo banner-promo">
        <div class="banner-promo__coop">
          <div class="banner-promo__coop-wrap">
            <div class="banner-promo__michelin"><img src="/img/promo/michelin-logo.svg" class="lazyload" alt="img">
            </div>
          </div>
        </div>
        <div class="banner-promo__text">Получи зимнюю резину Michelin в подарок при покупке нового автомобиля!</div>
        <div class="banner-promo__tire">
          <picture>
            <source type="image/webp" src="/img/promo/tire.webp">
            <img class="lazyload" src="/img/promo/tire.webp" alt="img">
          </picture>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import ListMarks from "~/components/List/Marks.vue";
import Actions from "~/components/Actions/index.vue";
import CarouselMain from "~/components/Carousel/Main.vue";
import CatalogNewHome from '~/components/Catalog/CatalogNewHome.vue'
import CatalogFoldersHome from '~/components/Catalog/CatalogFoldersHome.vue'

const seoTags = renderSeoTemplate('index')
</script>