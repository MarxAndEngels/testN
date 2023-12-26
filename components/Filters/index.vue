<template>
  <div>
    <div class="filters__tabs">
      <nuxt-link :class="{'button--primary':type==='new'}" :to="`/new`"
                 class="button button--short  button--primary-opacity">Новые
      </nuxt-link>
      <nuxt-link :class="{'button--primary':type==='used'}" :to="`/used`"
                 class="button button--short button--primary-opacity">с пробегом
      </nuxt-link>
    </div>
    <FiltersListUsed v-if="type!=='new'"/>
    <FiltersListNew v-if="type==='new'"/>
  </div>
</template>
<script setup lang="ts">
import FiltersListUsed from "~/components/Filters/ListUsed.vue";
import FiltersListNew from "~/components/Filters/ListNew.vue";

const props = defineProps<{
  type: string
}>()
const route = useRoute()
</script>