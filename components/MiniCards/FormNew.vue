<template>
  <div class="mini__card mini__card--form">
    <div class="mini__card-header">
      <div class="mini__card-slider">
        <div class="mini__card-slider-mobile">
          <div @click="emit('choseOffer', offer)"
               v-for="(img, i) in photos"
               :key="i"
               class="mini__card-slide">
            <img @click.right.prevent class="lazyload"
                 :data-src="img.small_webp"
                 alt="image" src=""/>
          </div>
        </div>
        <div @click="emit('choseOffer', offer)" class="mini__card-slider-desktop">
          <img  @click.right.prevent  :data-src="coverSrc"
               @load="onImgLoad"
               :class="className"
               class="lazyload"
               alt="" src=""/>
          <span class="brazzers__button-container"
                @mouseleave="mouseLeave">
                    <span
                        class="brazzers__button"
                        v-for="(photo) in photos"
                        :key="photo.small_webp"
                        @mouseover="mouseOver(photo.small_webp)"
                    ></span>
                </span>
        </div>
      </div>
    </div>
    <div class="mini__card-body-wrapper">
      <div class="mini__card-body">
        <div @click="emit('choseOffer', offer)"
             class="mini__card-name">
          <div class="mini__card-name-top">
            <div class="mini__card-name-mark">
              {{ offer.folder.title }}
            </div>
            <!--        <div class="mini__card-like">-->
            <!--          <nuxt-icon name="like"/>-->
            <!--        </div>-->
            <div class="mini__card-name-year">
              <!--              {{ offer.year }}-->
            </div>
          </div>
          <div class="mini__card-name-sub">
            {{ offer.mark.title }}
          </div>
          <div class="mini__card-name-sub">
            <!--            {{ engineVolume(offer.engine_volume) }}-->
          </div>
          <div class="mini__card-name-sub">
            <!--            {{ offer.year }} г.-->
          </div>
        </div>
        <div class="mini__card-tech">
          <div class="mini__card-tech-item">
            <!--            <span> {{ engineVolume(offer.engine_volume) }} л.</span>-->
          </div>
          <div class="mini__card-tech-item">
            <!--            <span>{{ offer.engine_power }} л.с.</span>-->
          </div>
          <div class="mini__card-tech-item">
            <!--            <span>{{ offer.gearbox.title }}</span>-->
          </div>
          <div class="mini__card-tech-item">
            <!--            <span> {{ offer.engineType.title }}</span>-->
          </div>
        </div>
        <div class="mini__card-lines">
          <div class="mini__card-line"></div>
          <div class="mini__card-line"></div>
          <div class="mini__card-line"></div>
          <div class="mini__card-line"></div>
        </div>
        <div class="mini__card-price-wrapper">
          <div class="mini__card-price">
            от {{ numberFormat(offer.price) }} ₽
          </div>
          <div class="mini__card-price-credit">
            {{ creditPrice(offer.price) }} ₽/мес.
          </div>
        </div>
      </div>
      <div class="mini__card-footer mini__card-footer--form">
        <button @click="emit('choseOffer', offer)" class="button button--short button--primary">
          Выбрать
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {creditPrice, engineVolume, numberFormat} from "~/helpers/filters";
import {NewOfferType} from "~/apollo/queries/new/newOffers";

const emit = defineEmits(['choseOffer'])
const props = defineProps<{
  offer: NewOfferType
}>()


let className = ref<string>('load')
let limit = ref<number>(10)
let forceCoverPhoto = ref<string | null>(null)

const onImgLoad = () => {
  className.value = 'loaded';
}
const mouseOver = (photo: string) => {
  if (forceCoverPhoto.value !== null) {
    className.value = 'load';
  }
  forceCoverPhoto.value = photo;
}
const mouseLeave = () => {
  forceCoverPhoto.value = null;
  className.value = 'loaded';
}
const photos = computed(() => {
  return props.offer.media
})
const coverSrc = computed(() => {
  return forceCoverPhoto.value
      ? forceCoverPhoto.value
      : photos.value[0].small_webp
})


</script>