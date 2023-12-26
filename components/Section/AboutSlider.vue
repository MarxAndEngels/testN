<template>
  <div class="slider-about f-carousel" id="slider-about">
    <div class="f-carousel__viewport">
      <div class="f-carousel__track">
        <div class="f-carousel__slide slider-about__slide" v-for="(slide, index) in slidesNumber" :key="index">
          <Picture custom-class="slider-about__image" :img="`/img/slider/about/slide-${index + 1}`" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Picture from "~/components/Picture";
import { Carousel } from "@fancyapps/ui";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";

import { onMounted } from "vue";

const slidesNumber = 14;

onMounted(() => {
  const container = document.getElementById("slider-about");
  const options = {
    infinite: true,
    center: true,
    Dots: false,
    transition: "slide",
    Autoplay: {
      timeout: 3000,
    },
    Navigation: {
      nextTpl: "",
      prevTpl: "",
    },
  };
  const fc = new Carousel(container, options, { Autoplay });
});
</script>