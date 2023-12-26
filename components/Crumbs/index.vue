<template>
  <div class="crumbs">
    <div class="crumbs__list">
      <div class="crumbs__item" v-for="(crumb, index) in crumbs" :key="index">
        <nuxt-link
            class="crumbs__link"
            v-if="crumb.link"
            :to="`${crumb.link}`"
        >{{ currentTitle(crumb.title) }}
        </nuxt-link
        >
        <span class="crumbs__span" v-else>{{ currentTitle(crumb.title) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {CrumbsType} from "~/apollo/queries/siteConfig";

const props = defineProps<{
  crumbs: CrumbsType[] | undefined;
}>();
const currentTitle = (title: string) => {
  if (title.indexOf('Range Rover') >= 0) {
    let newTitle
    newTitle = 'Range Rover ' + title.split('Range Rover')[1]
    return newTitle
  } else {
    return title
  }


}
</script>