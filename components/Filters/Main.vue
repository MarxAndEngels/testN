<template>
  <div>
  <div class="filter__list" v-show="stateShowFilter.showFilter" :class="{'nospace': !stateShowFilter.showFilter}">
    <div class="container__block">
      <h2 class="heading heading--h2">
        Подобрать автомобиль
      </h2>
    </div>
    <div class="filter__list-group">
      <div class="filter__list-item">
        <Select :has-alphabet="true" @select="handlerSelect" :options="marks" title="Марка" type="mark" :value="mark"/>
      </div>

      <div class="filter__list-item" :class="{'opacity': folders.length < 1}">
        <Select :has-alphabet="true" @select="handlerSelect" :options="folders" title="Модель" type="folder"
                :value="folder"/>
      </div>
      <div class="filter__list-item">
        <Select @select="handlerSelect" :options="bodyTypes" title="Кузов" type="bodyType" :value="bodyType"/>
      </div>
      <div class="filter__list-item">
        <Select @select="handlerSelect" :options="gearboxes" title="КПП" type="gearbox" :value="gearbox"/>
      </div>
      <div class="filter__list-item">
        <Select @select="handlerSelect" :options="engineTypes" title="Двигатель" type="engine" :value="engineType"/>
      </div>
      <div class="filter__list-item">
        <Select @select="handlerSelect" :options="driveTypes" title="Привод" type="drive" :value="driveType"/>
      </div>

        <div class="range">
          <div class="range__inputs">
            <div class="range__input-wrapper">
              <div class="range__input_price">Цена от</div>
              <input @change="changeFrom" class="range__input left" type="tel" :value="fromValueInput">
            </div>
            <div class="range__input-wrapper">
              <div class="range__input_price">Цена до</div>
              <input @change="changeTo" class="range__input right" type="tel" :value="toValueInput">
            </div>
          </div>
        </div>
      </div>

    <div class="filter__list-group">
      <button @click="onFilter" class="button button--filter">Показать {{ total }} авто</button>
    </div>

  </div>
    <div class="wrapper__filter-options">
      <div class="filter__list_select" @click="changeShowFilters">
      <span v-if="stateShowFilter.showFilter == false" class="filter__list_select-wrap">
           <nuxt-icon class="catalog__filter-icon" name="filter"/>
        Открыть фильтр </span>
        <span v-else class="filter__list_select-wrap">
      <nuxt-icon class="catalog__filter-icon" name="filter"/>
        Скрыть фильтр</span>
      </div>
      <CatalogSort v-if="route.name != 'index'"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import Select from '~/components/Controls/Select.vue'
import {computed} from "#imports";
import CatalogSort from "~/components/Catalog/Sort.vue"
import {scrollToElement} from "~/helpers/scroll";
import {requestNewFilters} from "~/helpers/request";
import Radio from "~/components/Controls/Radio.vue";
import Range from "~/components/Controls/Range.vue";
import {useSiteConfig} from "~/store/siteConfig";
import {numberFormat} from "~/helpers/filters";
import {MarkType} from "~/app/types/marks";
import {FolderType} from "~/app/types/folders";
import {useShowFilter} from "~/store/filters";
import Slider from "@vueform/slider";
const { isMobile } = useDevice();

const route = useRoute()
const router = useRouter()
const total = ref()
const hasChanged = ref(false)
const marks = computed(() => {
  return useSiteConfig().catalog.filter(item => item.offers_count > 0).sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
})
const mark = ref<MarkType | null>()
const folder = ref<FolderType | null>()
const folders = computed(() => {
  return mark.value?.folders.filter(item => item.offers_count > 0) || []
})
const bodyTypes = ref()
const bodyType = ref()

const gearboxes = ref()
const gearbox = ref()

const engineTypes = ref()
const engineType = ref()
const driveTypes = ref()
const driveType = ref()


const price_from = ref<number>(0)
const chosen_price_from = ref<number>(0)
const price_to = ref<number>(0)
const chosen_price_to = ref<number>(0)

const fromValueInput = computed(() => {
  return numberFormat(Number(price_from.value)) + ' ₽'
})
const toValueInput = computed(() => {
  return numberFormat(Number(price_to.value)) + ' ₽'
})

const changeFrom = (event: any) => {
  price_from.value = event.target.value.replace(/\D/g, '');

}
const changeTo = (event: any) => {
  price_to.value = event.target.value.replace(/\D/g, '');
}

const format = (value: any) => {
  return numberFormat(Number(value)) + ' ₽'
}


const stateShowFilter = useShowFilter()

if(isMobile){
  stateShowFilter.setShowFilter(false)
}

let changeShowFilters = () =>{
  stateShowFilter.setShowFilter(!stateShowFilter.showFilter)
}



let variables = computed<any>(() => {
  return {
    mark_slug: route.query.mark ? route.query.mark : mark.value?.slug || null,
    folder_slug: route.query.folder ? route.query.folder : folder.value?.slug || null,
    gearbox: route.query.gearbox ? route.query.gearbox.toString().toUpperCase() : gearbox.value?.name.toUpperCase() || null,
    engine_type: route.query.engine_type ? route.query.engine_type.toString().toUpperCase() : engineType.value?.slug.toUpperCase() || null,
    drive_type: route.query.drive_type ? route.query.drive_type.toString().toUpperCase() : driveType.value?.slug.toUpperCase() || null,
    body_type: route.query.body_type ? route.query.body_type : bodyType.value?.name || null,
    price_from: price_from.value ? Number(price_from.value) : null,
    price_to: price_to.value ? Number(price_to.value) : null
  }
})

mark.value = marks.value.find(item => item.slug === route.query.mark) || null
folder.value = marks.value.find(item => item.slug === route.query.mark)
    ?.folders.find(item => item.slug === route.query.folder) || null


const request = async () => {
  const {data} = await requestNewFilters(variables.value)

  engineTypes.value = data.value?.offerFilter.engineType
  driveTypes.value = data.value?.offerFilter.driveType
  bodyTypes.value = data.value?.offerFilter?.bodyType
  gearboxes.value = data.value?.offerFilter?.gearbox
  total.value = data.value?.offerFilter.count

  price_from.value = data.value?.offerFilter?.price[0]
  price_to.value = data.value?.offerFilter?.price[1]
}
const {data} = await requestNewFilters(variables.value);
bodyTypes.value = data.value?.offerFilter?.bodyType
gearboxes.value = data.value?.offerFilter?.gearbox
engineTypes.value = data.value?.offerFilter.engineType
driveTypes.value = data.value?.offerFilter.driveType
bodyType.value = bodyTypes.value?.find((item: { name: string; }) => item.name === route.query.body_type) || null
gearbox.value = gearboxes.value?.find((item: { name: string; }) => item.name === route.query.gearbox) || null

price_from.value = data.value?.offerFilter?.price[0]
chosen_price_from.value = data.value?.offerFilter?.price[0]
price_to.value = data.value?.offerFilter?.price[1]
chosen_price_to.value = data.value?.offerFilter?.price[1]

watch(data, () => {
  bodyTypes.value = data.value?.offerFilter?.bodyType
  gearboxes.value = data.value?.offerFilter?.gearbox

  engineTypes.value = data.value?.offerFilter.engineType
  driveTypes.value = data.value?.offerFilter.driveType

  price_from.value = data.value?.offerFilter?.price[0]
  chosen_price_from.value = data.value?.offerFilter?.price[0]
  price_to.value = data.value?.offerFilter?.price[1]
  chosen_price_to.value = data.value?.offerFilter?.price[1]

  if(route.query.price_from){
    price_from.value = Number(route.query.price_from)
  }
  if(route.query.price_to){
    price_to.value = Number(route.query.price_to)
  }
});
const onChangePrice = async (option: any) => {
  if (option.type === 'from') {
    chosen_price_from.value = option.value
  }
  if (option.type === 'to') {
    chosen_price_to.value = option.value
  }
  await request()
  hasChanged.value = true
}
const handlerSelect = async (data: any) => {
  await router.replace({'query': undefined})
  if (data.type === 'mark') {
    mark.value = data.option
    folder.value = null
    bodyType.value = null
    gearbox.value = null
    driveType.value = null
    engineType.value = null
  }
  if (data.type === 'folder') {
    folder.value = data.option
    bodyType.value = null
    gearbox.value = null
    driveType.value = null
    engineType.value = null
  }
  if (data.type === 'bodyType') {
    bodyType.value = data.option
  }
  if (data.type === 'gearbox') {
    gearbox.value = data.option
  }
  if (data.type === 'engine') {
    engineType.value = data.option
  }
  if (data.type === 'drive') {
    driveType.value = data.option
  }
  await request()
  hasChanged.value = true
}
const onFilter = async () => {
  let route = '/new'
  let query = <any>{}
  if (mark.value) {
    query['mark'] = mark.value.slug
    scrollToElement('#catalog')
  }
  if (folder.value) {
    query['folder'] = folder.value.slug
    scrollToElement('#catalog')
  }
  if (bodyType.value) {
    query['body_type'] = bodyType.value.name
    scrollToElement('#catalog')
  }
  if (gearbox.value) {
    query['gearbox'] = gearbox.value.name
    scrollToElement('#catalog')
  }
  if (engineType.value) {
    query['engine_type'] = engineType.value.slug
    scrollToElement('#catalog')
  }
  if (driveType.value) {
    query['drive_type'] = driveType.value.slug
    scrollToElement('#catalog')
  }
  if (chosen_price_from.value) {
    query['price_from'] = price_from.value
    scrollToElement('#catalog')
  }
  if (chosen_price_to.value) {
    query['price_to'] = price_to.value
    scrollToElement('#catalog')
  }

  await router.push({path: route, query})

}
</script>