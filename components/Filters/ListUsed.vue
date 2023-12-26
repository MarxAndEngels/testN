<template>
<!--  <div class="filter__list">-->
<!--    <Select has-alphabet @select="handlerSelect" :options="marks" title="марка" type="mark" :value="mark"/>-->
<!--    <Select has-alphabet @select="handlerSelect" :options="folders" title="модель" type="folder" :value="folder"/>-->
<!--    <Select @select="handlerSelect" :options="bodyTypes" title="кузов" type="bodyType" :value="bodyType"/>-->
<!--    <Select @select="handlerSelect" :options="gearboxes" title="КПП" type="gearbox" :value="gearbox"/>-->
<!--    <Radio @change-radio="changeRadio($event, 'engine')" :options="engineTypes" title="двигатель"-->
<!--           :value="engineType"/>-->
<!--    <Radio @change-radio="changeRadio($event, 'drive')" :options="driveTypes" title="привод"-->
<!--           :value="driveType"/>-->
<!--    &lt;!&ndash;    <Range :from="price[0]" :to="price[1]" :step="100000" :from-value="300000" prefix="" :to-value="800000"/>&ndash;&gt;-->
<!--    &lt;!&ndash;    <Range :from="1000" :to="8000" :step="1000" :from-value="2000" prefix="" :to-value="5000"/>&ndash;&gt;-->
<!--    <button v-if="total" @click="onFilter" class="button  button&#45;&#45;primary">показать {{ total }} авто</button>-->
<!--  </div>-->
</template>
<!--<script setup lang="ts">-->
<!--import Select from '~/components/Controls/Select.vue'-->
<!--import Radio from '~/components/Controls/Radio.vue'-->
<!--import Range from "~/components/Controls/Range.vue";-->
<!--import {useMarks} from "~/store/marks";-->
<!--import {FolderType, MarkType} from "~/apollo/queries/markFolder";-->
<!--import {requestFilters, requestFiltersCount, requestOffers} from "~/helpers/request";-->
<!--import {computed} from "#imports";-->
<!--import {scrollToElement} from "~/helpers/scroll";-->

<!--const route = useRoute()-->
<!--const router = useRouter()-->

<!--const total = ref()-->
<!--const marks = computed(() => {-->
<!--  return useMarks().marks-->
<!--})-->
<!--const mark = ref<MarkType | null>(null)-->
<!--const folder = ref<FolderType | null>(null)-->
<!--const folders = computed(() => {-->
<!--  return mark.value?.folders || []-->
<!--})-->

<!--const engineTypes = ref(-->
<!--    [-->
<!--      {-->
<!--        title: 'Бензин',-->
<!--        slug: 'gasoline',-->
<!--        active: false,-->
<!--        id: 1-->
<!--      },-->
<!--      {-->
<!--        title: 'Дизель',-->
<!--        slug: 'diesel',-->
<!--        active: false,-->
<!--        id: 2-->
<!--      },-->
<!--      {-->
<!--        title: 'Гибрид',-->
<!--        slug: 'hybrid',-->
<!--        active: false,-->
<!--        id: 3-->
<!--      }-->
<!--    ]-->
<!--)-->
<!--const engineType = ref()-->
<!--const driveTypes = ref([-->
<!--  {-->
<!--    title: 'Передний',-->
<!--    slug: 'front',-->
<!--    active: false,-->
<!--    id: 1-->
<!--  },-->
<!--  {-->
<!--    title: 'Полный',-->
<!--    slug: 'full',-->
<!--    active: false,-->
<!--    id: 2-->
<!--  },-->
<!--  {-->
<!--    title: 'Задний',-->
<!--    slug: 'rear',-->
<!--    active: false,-->
<!--    id: 3-->
<!--  }-->
<!--])-->
<!--const driveType = ref()-->


<!--const gearboxes = ref()-->
<!--const gearbox = ref()-->
<!--const bodyTypes = ref()-->
<!--const bodyType = ref()-->

<!--const price = ref()-->


<!--let variables = computed<any>(() => {-->
<!--  return {-->
<!--    mark_slug_array: mark.value?.slug ? [mark.value?.slug] : null,-->
<!--    folder_slug_array: folder.value?.slug ? [folder.value?.slug] : null,-->
<!--    gearbox_id_array: gearbox.value?.id ? [gearbox.value.id] : null,-->
<!--    drive_type_id_array: driveType.value?.id ? [driveType.value.id] : null,-->
<!--    engine_type_id_array: engineType.value?.id ? [engineType.value.id] : null,-->
<!--    price_from: null,-->
<!--    price_to: null-->
<!--  }-->
<!--})-->

<!--mark.value = marks.value.find(item => item.slug === route.params.mark) || null-->
<!--folder.value = marks.value.find(item => item.slug === route.params.mark)-->
<!--    ?.folders.find(item => item.slug === route.params.folder) || null-->


<!--engineType.value = engineTypes.value.find(item => item.id === Number(route.query.engine)) || null-->
<!--driveType.value = driveTypes.value.find(item => item.id === Number(route.query.drive)) || null-->


<!--const request = async () => {-->
<!--  const {pending, data} = await requestFilters(variables.value)-->

<!--  engineTypes.value = engineTypes.value.map(item => {-->
<!--    item.active = !!data.value?.offerFilters?.engineType.filter(engine => engine.slug === item.slug).length;-->
<!--    return item-->
<!--  })-->
<!--  driveTypes.value = driveTypes.value.map(item => {-->
<!--    item.active = !!data.value?.offerFilters?.driveType.filter(drive => drive.slug === item.slug).length;-->
<!--    return item-->
<!--  })-->
<!--  gearboxes.value = data.value?.offerFilters?.gearbox-->
<!--  bodyTypes.value = data.value?.offerFilters?.bodyType-->
<!--  price.value = data.value?.offerFilters.price-->
<!--}-->

<!--const {pending, data} = await requestFilters(variables.value);-->
<!--engineTypes.value = engineTypes.value.map(item => {-->
<!--  item.active = !!data.value?.offerFilters?.engineType.filter(engine => engine.slug === item.slug).length;-->
<!--  return item-->
<!--})-->
<!--driveTypes.value = driveTypes.value.map(item => {-->
<!--  item.active = !!data.value?.offerFilters?.driveType.filter(drive => drive.slug === item.slug).length;-->
<!--  return item-->
<!--})-->
<!--gearboxes.value = data.value?.offerFilters?.gearbox-->
<!--bodyTypes.value = data.value?.offerFilters?.bodyType-->
<!--price.value = data.value?.offerFilters.price-->
<!--bodyType.value = bodyTypes.value?.find((item: { id: number; }) => item.id === Number(route.query.body_type)) || null-->
<!--gearbox.value = gearboxes.value?.find((item: { id: number; }) => item.id === Number(route.query.gearbox)) || null-->
<!--watch(data, () => {-->
<!--  engineTypes.value = engineTypes.value.map(item => {-->
<!--    item.active = !!data.value?.offerFilters?.engineType.filter(engine => engine.slug === item.slug).length;-->
<!--    return item-->
<!--  })-->
<!--  driveTypes.value = driveTypes.value.map(item => {-->
<!--    item.active = !!data.value?.offerFilters?.driveType.filter(drive => drive.slug === item.slug).length;-->
<!--    return item-->
<!--  })-->
<!--  gearboxes.value = data.value?.offerFilters?.gearbox-->
<!--  bodyTypes.value = data.value?.offerFilters?.bodyType-->
<!--  price.value = data.value?.offerFilters.price-->
<!--});-->


<!--const getCount = async () => {-->
<!--  const {data} = await requestFiltersCount(variables.value)-->
<!--  total.value = data.value?.offers?.total-->
<!--}-->
<!--const handlerSelect = async (data: any) => {-->
<!--  await router.replace({'query': undefined})-->
<!--  if (data.type === 'mark') {-->
<!--    mark.value = data.option-->
<!--    folder.value = null-->
<!--    bodyType.value = null-->
<!--    gearbox.value = null-->
<!--    engineType.value = null-->
<!--    driveType.value = null-->
<!--  }-->
<!--  if (data.type === 'folder') {-->
<!--    folder.value = data.option-->
<!--    bodyType.value = null-->
<!--    gearbox.value = null-->
<!--    engineType.value = null-->
<!--    driveType.value = null-->
<!--  }-->
<!--  if (data.type === 'bodyType') {-->
<!--    bodyType.value = data.option-->
<!--  }-->
<!--  if (data.type === 'gearbox') {-->
<!--    gearbox.value = data.option-->
<!--  }-->
<!--  await request()-->
<!--  await getCount()-->
<!--}-->

<!--const changeRadio = async (item: any, type: any) => {-->
<!--  await router.replace({'query': undefined})-->
<!--  if (type === 'engine') {-->
<!--    engineType.value = item-->
<!--  }-->
<!--  if (type === 'drive') {-->
<!--    driveType.value = item-->
<!--  }-->
<!--  await request()-->
<!--  await getCount()-->
<!--}-->
<!--const onFilter = async () => {-->
<!--  let route = '/used'-->
<!--  let query = <any>{}-->
<!--  if (mark.value) {-->
<!--    route += `/${mark.value.slug}`-->
<!--  }-->
<!--  if (folder.value) {-->
<!--    route += `/${folder.value.slug}`-->
<!--  }-->
<!--  if (engineType.value) {-->
<!--    query['engine'] = engineType.value.id-->
<!--    scrollToElement('#catalog')-->
<!--  }-->
<!--  if (gearbox.value) {-->
<!--    query['gearbox'] = gearbox.value.id-->
<!--    scrollToElement('#catalog')-->
<!--  }-->
<!--  if (driveType.value) {-->
<!--    query['drive'] = driveType.value.id-->
<!--    scrollToElement('#catalog')-->
<!--  }-->
<!--  if (bodyType.value) {-->
<!--    query['body_type'] = bodyType.value.id-->
<!--    scrollToElement('#catalog')-->
<!--  }-->
<!--  await router.push({path: route, query})-->
<!--}-->
<!--</script>-->