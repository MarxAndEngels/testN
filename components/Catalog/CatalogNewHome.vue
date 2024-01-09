<template>
  <div class="catalog" id="catalog">
    <div class="catalog__offers catalog__offers--short">
      <CardOffer v-for="offer in offers" :offer="offer"/>
    </div>
  </div>
  <nuxt-link to="/new" class="button button--short button--primary-opacity button--more">Все автомобили</nuxt-link>
</template>

<script setup lang="ts">
import CardOffer from '~/components/MiniCards/Offer.vue'
import {requestNewOffers} from "~/helpers/request";
import {computed, ref} from "#imports";
import {currentTab} from "~/app/tabs";
import {onMounted} from "vue";
import {Carousel} from "@fancyapps/ui";
import {NewOffersInputType, NewOfferType} from "~/apollo/queries/new/newOffers";


const offers = ref<NewOfferType[]>()
const route = useRoute()

let loading = ref<boolean>(true)

let variables = computed<NewOffersInputType>(() => {
  return {
    mark_slug: route.params.mark ? route.params.mark : null,
    folder_slug: route.params.folder ? route.params.folder : null,
    sort: 'created_at|desc',
    page: 1,
    limit: 12
  }
})

const {pending, data} = await requestNewOffers(variables.value)
offers.value = data.value?.offers.data
loading.value = pending.value

watch(data, () => {
  offers.value = data.value?.offers.data
  loading.value = false
})

const request = async () => {
  loading.value = true
  const {pending, data} = await requestNewOffers(variables.value)
  offers.value = data.value?.offers.data
  loading.value = pending.value
}
//
// watch(route, async () => {
//   await request()
// })
//
// watch(currentTab, async () => {
//   await request()
// })

// onMounted(() => {
//   const container = document.getElementById("catalogSlider");
//   const options = {
//     infinite: true,
//     center: false,
//     transition: 'slide',
//     getProgress: 'center',
//     Thumbs: {
//       type: "modern",
//     },
//   };
//   const fc = new Carousel(container, options);
// })


</script>