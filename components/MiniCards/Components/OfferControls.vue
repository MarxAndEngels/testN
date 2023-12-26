<template>
  <div class="mini-card__offer-controls">
    <div class="mini-card__offer-credit">
      <div class="mini-card__offer-credit-price">
        {{ creditPrice(offer.price) }} ₽/мес
      </div>
      <div class="mini-card__offer-credit-text">
        без первого взноса
      </div>
    </div>
    <div class="button button--card-credit"
         @click.prevent="onCredit">
      Купить в кредит
    </div>
  </div>
</template>
<script setup lang="ts">
import {creditPrice} from "~/helpers/filters";
import {NewOfferType} from "~/apollo/queries/new/newOffers";
import {useModals} from "~/store/modals";

const props = defineProps<{
  offer: NewOfferType;
}>();

let modalOffer = computed(() => {
  return {
    id: props.offer.id,
    mark: props.offer.mark.title,
    folder: props.offer.folder.title,
    modification: props.offer.complectation.title,
    title: `${props.offer.mark.title} ${props.offer.folder.title} ${props.offer.complectation.title}`,
    image: props.offer.images[0].medium_webp,
    price: props.offer.price,
    tech: [
      {
        name: "Привод",
        value: `${props.offer.modification.drive_type.title}`,
      },
      {
        name: "Коробка",
        value: `${props.offer.modification.gearbox.title}`,
      },
      {
        name: "Тип двигателя",
        value: `${props.offer.modification.engine_type.title}`,
      },
      {
        name: "Кузов",
        value: `${props.offer.folder.bodyType.title}`,
      },
      {
        name: "Мощность",
        value: `${props.offer.modification.engine_power ?
            props.offer.modification.engine_power + 'л.с.' :
            props.offer.modification.engine_power_kvt + 'кВт'}`,
      },
      {
        name: "Объем",
        value: `${props.offer.modification.engine_volume} л.`,
      }
    ],
    offer_id: props.offer.id,
    type: 'offer'
  }
})

const onCredit = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на автокредит',
    type: 'credit-new'
  })
};
const onExchange = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на Trade-in',
    type: 'exchange-new'
  })
};
</script>
