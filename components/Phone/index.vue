<template>
  <div @click="phoneClick" v-if="isNight && settings.contact_phone">
    <span v-if="number">{{ settings.contact_phone }}</span>
    <nuxt-icon v-if="icon" name="phone"/>
  </div>
  <div v-else-if="settings.contact_phone">
    <a :href="`tel:${clearPhone(settings.contact_phone)}`">
      <span v-if="number">{{ settings.contact_phone }}</span>
      <nuxt-icon v-if="icon" name="phone"/>
    </a>
  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {useModals} from "~/store/modals";
import {clearPhone} from "~/helpers/filters";

const props = defineProps<{
  number?: boolean;
  icon?: boolean;
}>();
let isNight = computed(() => useSiteConfig().isNight)
let settings = useSiteConfig().settings
const phoneClick = () => {
  useModals().openModal({
    open: true,
    title: 'обратный звонок',
    type: 'express'
  })
}
</script>
