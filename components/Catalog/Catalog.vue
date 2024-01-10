<template>
  <div class="catalog" id="catalog" v-if="offers && offers.length" >
<!--    <h2 class="heading heading&#45;&#45;h2">-->
<!--      Новые автомобили-->
<!--    </h2>-->
    <div class="catalog__offers">
      <CardOffer :key="offer.id" v-for="offer in offers" :offer="offer"/>
    </div>
    <client-only>
      <Paginate
          v-if="last_page > 1"
          v-model="currentPagination"
          :page-count="last_page"
          :click-handler="paginateClick"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          prev-class="prev"
            next-class="next"
          :container-class="'pagination'">
      </Paginate>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
import CardOffer from "~/components/MiniCards/Offer.vue";
import CatalogControlsNew from '~/components/Catalog/ControlsNew.vue'
import {NewOffersInputType, NewOfferType} from "~/apollo/queries/new/newOffers";
import {requestNewOffers} from "~/helpers/request";
import {computed, ref} from "#imports";
import {LocationQueryValue, useRoute} from 'vue-router';
import {watch} from 'vue';
import CatalogSort from '~/components/Catalog/Sort.vue'
import {scrollToElement} from "~/helpers/scroll";


const offers = ref<NewOfferType[]>()
const route = useRoute()
const router = useRouter()

let loading = ref<boolean>(true)

const total = ref()
const current_page = ref(1)
const last_page = ref()

let currentPagination = ref<number>(1)
if(route.query.page){
  currentPagination.value = Number(route.query.page)
}


let variables = computed<NewOffersInputType>(() => {
  return {
    mark_slug: route.params.mark ? route.params.mark : route.query.mark ? route.query.mark : null,
    folder_slug: route.params.folder ? route.params.folder : route.query.folder ? route.query.folder : null,
    body_type: route.query.body_type ? route.query.body_type : null,
    gearbox: route.query.gearbox ? route.query.gearbox.toString().toUpperCase() : null,
    engine_type: route.query.engine_type ? route.query.engine_type.toString().toUpperCase() : null,
    drive_type: route.query.drive_type ? route.query.drive_type.toString().toUpperCase() : null,
    price_from: route.query.price_from ? Number(route.query.price_from) : null,
    price_to: route.query.price_to ? Number(route.query.price_to) : null,
    sort: route.query.sort ? route.query.sort : route.name == 'new' ? 'price|asc': 'created_at|desc',
    page: Number(route.query.page) || 1,
    set: route.params.set || null
  }
})

const {pending, data, error} = await requestNewOffers(variables.value)
offers.value = data.value?.offers.data


current_page.value = data.value?.offers.current_page
last_page.value = data.value?.offers.last_page

loading.value = pending.value


// watch(data, () => {
//   offers.value = data.value?.offers.data
//   loading.value = false
// })


const request = async () => {
  loading.value = true
  const {pending, data} = await requestNewOffers(variables.value)
  offers.value = data.value?.offers.data

  current_page.value = data.value?.offers.current_page
  last_page.value = data.value?.offers.last_page
  loading.value = pending.value

}

watch(route, async () => {
  await request()

}, {immediate: true})


onMounted(()=>{
  if(!offers.value){
    request()
  }
})

type PaginateQuery = {
  drive_type: string | LocationQueryValue[];
  engine_type: string | LocationQueryValue[];
  gearbox: string | LocationQueryValue[];
  folder: string | LocationQueryValue[];
  body_type: string | LocationQueryValue[];
  mark: string | LocationQueryValue[];
  page: number;
  sort?: string | LocationQueryValue[];
  price_from?: string | LocationQueryValue[];
  price_to?: string | LocationQueryValue[];
};

const paginateClick = async (page: number) => {
  currentPagination.value = page
  const query: PaginateQuery = {
    page,
    drive_type: '',
    engine_type: '',
    gearbox: '',
    folder: '',
    body_type: '',
    mark: '',
    price_from: '',
    price_to: ''
  }
  if (route.query.sort) query.sort = route.query.sort
  if (route.query.mark) query.mark = route.query.mark
  if (route.query.folder) query.folder = route.query.folder
  if (route.query.body_type) query.body_type = route.query.body_type
  if (route.query.gearbox) query.gearbox = route.query.gearbox
  if (route.query.engine_type) query.engine_type = route.query.engine_type
  if (route.query.drive_type) query.drive_type = route.query.drive_type
  if (route.query.price_from) query.price_from = route.query.price_from
  if (route.query.price_to) query.price_to = route.query.price_to
  await router.push({path: route.fullPath, query});
  await scrollToElement("#catalog");
};

onMounted(()=>{
  setTimeout(()=>{
    if(route.query.price_to || route.query){
      scrollToElement("#catalog");
    }
  },300)
})

</script>