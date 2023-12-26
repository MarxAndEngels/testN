<template>
  <div class="f-carousel--main f-carousel" id="slider-index">
    <div class="f-carousel__viewport">
      <div class="f-carousel__track">
        <nuxt-link :to="`/${slide.slug}`" class="f-carousel__slide f-carousel__slide--main" v-for="slide in slides">
          <div class="carousel__mask"></div>
          <!--          <div class="f-carousel&#45;&#45;main-content">-->
          <!--            <div class="f-carousel&#45;&#45;main-title" v-html="slide.title"></div>-->
          <!--            <div class="f-carousel&#45;&#45;main-text" v-html="slide.text"></div>-->
          <!--            <nuxt-link :to="`/${slide.slug}`" class="button button&#45;&#45;slider">Выбрать автомобиль</nuxt-link>-->
          <!--          </div>-->
          <Picture :img="slide.image"/>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Picture from "~/components/Picture";
import {Carousel} from "@fancyapps/ui";
import {Autoplay} from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";

import {onMounted} from "vue";

const slides = computed(() => {
  return [
    // {
    //   title: `Распродажа авто 2023 года`,
    //   text: `Успей оформить автокредит!`,
    //   slug: 'credit-n',
    //   button: 'Выбрать авто',
    //   image: "/img/slider/index/slide-10",
    // },
    // {
    //   slug: 'credit-n',
    //   image: "/img/slider/index/slide-11",
    // },
    {
      title: `Распродажа авто 2023 года`,
      text: `Успей оформить автокредит!`,
      slug: 'credit-n',
      button: 'Выбрать авто',
      image: "/img/slider/index/slide-1",
    },
    {
      title: `Распродажа авто 2023 года`,
      text: `Успей оформить автокредит!`,
      slug: 'exchange-n',
      button: 'Выбрать авто',
      image: "/img/slider/index/slide-2",
    },
    {
      title: `Обменяй автомобиль по Trade-In`,
      text: `Ввыкупим за 30 минут, деньги на руки`,
      slug: 'credit-n',
      button: 'Выбрать авто',
      image: "/img/slider/index/slide-3",
    },

  ];

})
onMounted(() => {
  const container = document.getElementById("slider-index");
  const options = {
    infinite: true,
    center: true,
    Dots: false,
    transition: "slide",
    Autoplay: {
      timeout: 3000,
    }
  };
  const fc = new Carousel(container, options, {Autoplay});
  // const fc = new Carousel(container, options);
});
</script>