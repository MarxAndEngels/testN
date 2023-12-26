<template>
  <div class="action__mark">
    <div class="action__mark-line">
      <div class="action__mark-banner">
        <Picture custom-class="action__mark-banner-image" @click.right.prevent
                 :img="`/img/marks/${currentMark.slug}/car`"/>
        <div class="mark__banner-line">
          <div class="mark__banner-logo-warp">
            <nuxt-icon :name="`emblems/${currentMark.slug}`"/>
          </div>
          <div class="mark__banner-line-text">
            Выгода до 204 000 ₽ на все модели {{ currentMark.title }}
          </div>
        </div>
        <div class="mark__banner-content">
          <div class="mark__banner-title">
            Выгодный автокредит 4.9%
          </div>
          <div class="mark__banner-text">
            По специальной программе {{ currentMark.title }}
          </div>
        </div>
      </div>
      <div class="action__mark-form">
        <div class="action__mark-form-title">
          Получите персональное предложение до <span class="action__mark-date">{{ benefitDate }}</span>
        </div>
        <FormCallback/>
      </div>
    </div>
    <h2 class="heading heading--h2">
      Акции и спецпредложения
    </h2>
    <Actions/>
  </div>
</template>

<script setup lang="ts">
import Actions from '~/components/Actions/index.vue'
import Picture from "~/components/Picture";
import FormCallback from '~/components/Form/Callback.vue'
import {useCatalog} from "~/store/catalog";
import {useSiteConfig} from "~/store/siteConfig";

const route = useRoute()

const date = new Date();
const m = new Date();
m.setDate(date.getDate() + 8 - date.getDay())
const month = m.getMonth() + 1
const day = m.getDate()

const benefitDate = computed(() => {
  let currentDay = day.toString().length === 1 ? '0' + day : day
  let currentMonth = month.toString().length === 1 ? '0' + month : month

  return `${currentDay}.${currentMonth}`
})

const marks = useSiteConfig().catalog
const currentMark = computed(() => {
  return marks.find(item => item.slug === route.params.mark)
})

const themes = useCatalog().themes
const currentTheme = computed(() => {
  return themes.find(item => item.slug === currentMark.value?.slug) || {
    slug: 'default',
    main: '',
    text: ''
  }
})

const setCatalogTheme = async (data: any) => useCatalog().setColorTheme(data)

setCatalogTheme(currentTheme.value)
onUnmounted(() => {
  setCatalogTheme({
    slug: 'default',
    main: '',
    text: ''
  })
})
</script>
