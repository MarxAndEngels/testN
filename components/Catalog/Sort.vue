<template>
  <div class="catalog__filters-controllers">
    <div class="catalog__sort"
         tabindex="1"
         @focusout="open=false"
         :class="{'catalog__sort--open':open}">
      <div class="catalog__sort-data" @click="open = !open">
        <nuxt-icon class="catalog__sort-icon" name="sort"/>
        {{activeSort}}
      </div>
      <div class="catalog__sort-item"
           :class="{'catalog__sort-item--active':isActive(item)}"
           @click="sort(item)"
           v-for="item in items">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useSort} from "~/store/sort";
import {ref} from "#imports";
import {useRoute} from "vue-router";

const route = useRoute()
const router = useRouter()

let items = ref<any>([
  {
    title: 'Сначала дешевле',
    slug: 'price|asc',
  },
  {
    title: 'Сначала дороже',
    slug: 'price|desc'
  },
  // {
  //   title: 'Год новее',
  //   slug: 'year|desc'
  // },
  // {
  //   title: 'Год старше',
  //   slug: 'year|asc'
  // },
  // {
  //   title: 'Пробег',
  //   slug: 'run|asc'
  // },
])

let activeSort = ref<string>('Сначала дешевле')
let open = ref<boolean>(false)

const stateSort = useSort()

let sort = (item: any) =>{
  activeSort.value = item.title
  open.value = false
  stateSort.setSort(item.slug)
  router.push({path: route.fullPath, query: {sort: item.slug, page: 1}});
}

let isActive = (item:any) =>{
  return stateSort.sort === item.slug
}

onMounted(()=>{
  if(stateSort.sort){
    let sort = items.value?.find(el =>{
      return el.slug== stateSort.sort
    })
    activeSort.value = sort.title
  }
})

</script>