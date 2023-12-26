<template>
  <div class="offer__slider">
    <div class="f-carousel f-carousel--offer" id="offerSlider">
      <div class="f-carousel__viewport">
        <div class="f-carousel__track">
          <div class="f-carousel__slide offer__slider-slide"
               :data-thumb-src="img.tiny_webp"
               v-for="img in offer.images">
            <img data-fancybox="gallery"
                 @click.right.prevent
                 :data-src="img.original"
                 :data-thumb-src="img.tiny_webp"
                 :data-lazy-src="img.medium_webp" alt="" src="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {Carousel, Fancybox} from "@fancyapps/ui";
import {Thumbs} from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import {onMounted} from "vue";
import {NewOfferPageType} from "~/apollo/queries/new/newOffer";


const props = defineProps<{
  offer: NewOfferPageType
}>()

const isRender = computed(() => {
  if (props.offer.type) {
    if (props.offer.type.name === 'SITE') {
      return true
    }
  }
})
onMounted(() => {
  const container = document.getElementById("offerSlider");
  const options = {
    Thumbs: {
      type: 'classic',
      Carousel: {
        slidesPerPage: 1,
        dragFree: false,
        Navigation: false,
        infinite: true
      },
    },
    infinite: true,
    center: true,
    transition: 'slide',
    preload: 3,
    getProgress: 'center',
  }
  const fc = new Carousel(container, options, {Thumbs});
  Fancybox.bind("[data-fancybox]", {
    Hash: false,
    contentClick: "iterateZoom",
    Images: {
      protected: true
    }
  });
})


</script>