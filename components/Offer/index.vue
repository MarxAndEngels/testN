<template>
  <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
  <h1 v-if="seoTags" class="heading heading--h1 visually-hidden">
    {{ seoTags.title }}
  </h1>
  <div class="grid__title" v-if="offer">
    {{ offer.mark.title }} {{ offer.folder.title }}, {{ offer.complectation.title }}
  </div>
  <section class="grid offer" v-if="offer">

    <div class="grid__left">
      <OfferSlider :offer="offer"/>
      <BuyOptions :active="offer.is_active" v-if="isMobile" @on-credit="onCredit" @on-exchange="onExchange"
                  :price="offer.price"
                  :price-old="offer.price_old" type="offer"/>
      <OfferTabs v-if="isMobile" :current-tech="currentTech" :complectation="offer.complectation"/>
      <BenefitsCredit/>
      <OfferComplectation v-if="isDesktop" :complectation="offer.complectation"/>
      <!-- <DealerCard/> -->
    </div>
    <div class="grid__right" v-if="isDesktop">
      <div class="grid__sticky">
        <BuyOptions :active="offer.is_active" @on-credit="onCredit"
                    @on-exchange="onExchange" :price="offer.price" :price-old="offer.price_old"
                    type="offer"/>
      </div>
      <Tech :tech="currentTech" view="inline"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import OfferSlider from "~/components/Offer/Slider.vue";
import BuyOptions from "~/components/BuyOptions/index.vue";
import OfferTabs from "~/components/Offer/Tabs.vue";
import BenefitsCredit from "~/components/Benefits/Credit.vue";
import DealerCard from "~/components/Dealer/Card.vue";
import OfferComplectation from "~/components/Offer/Complectation.vue";
import Tech from "~/components/Tech/index.vue";
import {requestNewOffer} from "~/helpers/request";
import {ref} from "#imports";
import {NewOfferPageInputType, NewOfferPageType} from "~/apollo/queries/new/newOffer";
import {renderSeoTemplate} from "~/composables/seo";
import {vkAdsReachGoal, yandexCommercialNew} from "~/helpers/metrika";
import {onMounted} from "vue";
import {computed} from "@vue/reactivity";
import {ModalOfferType, useModals} from "~/store/modals";

const {isMobile, isDesktop} = useDevice();


const offer = ref<NewOfferPageType>();
let seoTags = null;
const route = useRoute();
const variables: NewOfferPageInputType = {
  folder_slug: <string>route.params.folder,
  mark_slug: <string>route.params.mark,
  id: <number>Number(route.params.id),
};
const currentTech = computed(() => {
  return {
    complectation: offer.value?.complectation?.title,
    body_type: offer.value?.folder?.bodyType.title,
    engine_type: offer.value?.modification?.engine_type.title,
    gearbox: offer.value?.modification?.gearbox.title,
    drive_type: offer.value?.modification?.drive_type.title,
    engine_volume: offer.value?.modification?.engine_volume,
    engine_power: offer.value?.modification?.engine_power,
  }
})
const {data, error} = await requestNewOffer(variables);
if (error.value) {
  throw createError({statusCode: 404, statusMessage: "Page Not Found"});
} else {
  offer.value = data.value?.offer;
}

const sendCommercial = () => {
  if (offer.value) {
    yandexCommercialNew({
      id: offer.value?.id,
      mark: offer.value?.mark.title,
      folder: offer.value?.folder.title,
      price: offer.value?.price,
      modification: offer.value?.modification.title,
    });
    vkAdsReachGoal(offer.value?.price, offer.value?.id, false);
  }
};
watch(data, () => {
  offer.value = data.value?.offer;
  seoTags = renderSeoTemplate("new.offer", {
    offer: offer.value,
  });
  sendCommercial();
});

if (offer.value) {
  seoTags = renderSeoTemplate("new.offer", {
    offer: offer.value,
  });
}
onMounted(() => {
  sendCommercial();
});

let modalOffer = computed<ModalOfferType>(() => {
  return {
    id: offer.value?.id,
    mark: offer.value?.mark.title,
    markSlug: offer.value?.mark.slug,
    folder: offer.value?.folder.title,
    folderSlug: offer.value?.folder.slug,
    modification: offer.value?.complectation.title,
    title: `${offer.value?.mark.title} ${offer.value?.folder.title} ${offer.value?.modification.title} ${offer.value?.complectation.title}`,
    image: offer.value?.images[0].medium_webp,
    price: offer.value?.price,
    tech: [
      {
        name: "Привод",
        value: `${offer.value?.modification.drive_type.title}`,
      },
      {
        name: "Коробка",
        value: `${offer.value?.modification.gearbox.title}`,
      },
      {
        name: "Тип двигателя",
        value: `${offer.value?.modification.engine_type.title}`,
      },
      {
        name: "Кузов",
        value: `${offer.value?.folder.bodyType.title}`,
      },
      {
        name: "Мощность",
        value: `${offer.value?.modification.engine_power} л.с.`,
      },
      {
        name: "Объем",
        value: `${offer.value?.modification.engine_volume} л.`,
      },
    ],
    type: 'offer',
    offer_id: offer.value?.id
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