<template>
  <article class="mini-card mini-card__offer">
    <div class="mini-card__offer-stock mini-card__offer-stock--active">
      В наличии
    </div>
    <CardOfferTitle :link="offerLink" :title="offerTitle"/>
    <CardOfferPrices :price="offer.price" :price-old="offer.price_old"/>
    <CardOfferSlider :offer="offer"/>
    <div class="mini-card__offer-tech">
      <div class="mini-card__offer-tech-item">
        <div>{{ offer.modification.engine_volume }} л.</div>
      </div>
      <div class="mini-card__offer-tech-item">
        <div>{{ offer.modification.engine_power }} л.с.</div>
      </div>
      <div class="mini-card__offer-tech-item">
        <div>{{ offer.modification.gearbox.title }}</div>
      </div>
      <div class="mini-card__offer-tech-item">
        <div>{{ offer.modification.engine_type.title }}</div>
      </div>
    </div>
    <CardOfferControls :offer="offer"/>
  </article>
</template>
<script setup lang="ts">
import CardOfferTitle from '~/components/MiniCards/Components/OfferTitle.vue'
import CardOfferSlider from '~/components/MiniCards/Components/OfferSlider.vue'
import CardOfferPrices from '~/components/MiniCards/Components/OfferPrices.vue'
import CardOfferControls from '~/components/MiniCards/Components/OfferControls.vue'
import {NewOfferType} from "~/apollo/queries/new/newOffers";

const props = defineProps<{
  offer: NewOfferType;
}>();

const offerLink = computed(() => {
  return `/new/${props.offer.mark.slug}/${props.offer.folder.slug}/${props.offer.id}`
})
const offerTitle = computed(() => {
  return `${props.offer.mark.title} ${props.offer.folder.title}  ${props.offer.complectation.title}`
})


</script>