<template>
  <div class="section section--about section--margin-40">
    <div class="container">
      <Crumbs :crumbs="seoTags.crumbs" />
      <h1 class="heading heading--h1-primary heading--h1-primary--opacity">
        {{ seoTags.h1 }}
      </h1>
      <div class="about">
<!--        <div class="about__slider">-->
<!--          <SectionAboutSlider />-->
<!--        </div>-->
        <div class="about__text">
          <p class="text__p">
            ATLAS AUTO — автоцентр новых автомобилей в Москве. У нас лучшие условия
            по автокредитованию, низкая ставка, возможность приобретения нового авто
            в кредит без первого взноса. Мы предлагаем вашему вниманию более 35
            брендов ведущих автомобильных концернов.
          </p>
          <p class="text__p">
            Благодаря сотрудничеству с
            крупнейшими банками и статусу официального дилера клиенты нашего
            автоцентра получают возможность оформления автокредита на новый
            автомобиль не выходя из салона. Каждому, кто приобретает авто в ATLAS AUTO, мы дарим ценные подарки и предлагаем лучшие условия в Москве.
          </p>
          <p class="text__p">
            Мы наполняем автопарк за счет прямых поставок из Европы и Китая. Налаженная сеть партнеров в Поднебесной обеспечивает наличие всех актуальных новинок.
          </p>
          <p class="text__p">
            Наш автоцентр удобно расположен в 3 минутах ходьбы от метро Аннино, на юге Москвы, в самом сердце мира столичных автопродаж. Приезжайте и убедитесь сами — у нас обширная площадка новых автомобилей в наличии, новейшая клиентская зона, кредитные специалисты и масса положительных впечатлений от покупки долгожданного авто.
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="about__banner">
      <Picture custom-class="about__img" img="/img/pages/about/banner" />
      <div class="container">
        <BenefitsCredit class="benefits--dark" />
      </div>
    </div> -->
    <SectionPromotions />
  </div>
</template>
<script setup lang="ts">
import SectionServices from "~/components/Section/Services.vue";
import BenefitsCredit from "~/components/Benefits/Credit.vue";
import Picture from "~/components/Picture/index.vue";
import { renderSeoTemplate } from "~/composables/seo";
import Crumbs from "~/components/Crumbs/index.vue";
import {useSort} from "~/store/sort";

const stateSort = useSort()

stateSort.setSort(null)

const seoTags = renderSeoTemplate("about");
</script>