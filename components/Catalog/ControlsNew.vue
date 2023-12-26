<template>
  <div class="catalog__controls">
    <DefaultSelect @select="onSelect" class="default__select--catalog" :title="currentSort.name" :value="currentSort"
                   :options="sorts"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "#imports";
import DefaultSelect from "~/components/Controls/DefaultSelect.vue";

const router = useRouter();
const route = useRoute();

type SortType = {
  slug: string
  name: string
}

let isOpen = ref<boolean>(false)
let currentSort = ref<SortType>({
  slug: 'price|asc',
  name: 'сначала дешевле'
})
const sorts: SortType[] = [
  {
    slug: 'price|asc',
    name: 'сначала дешевле'
  },
  {
    slug: 'price|desc',
    name: 'сначала дороже'
  }
]

if (route.query.sort) {
  currentSort.value = sorts.find(item => item.slug === route.query.sort) || currentSort.value
}

const onSelect = async (option: SortType) => {
  await router.push({path: route.fullPath, query: {sort: option.slug, page: '1'}})
}


</script>