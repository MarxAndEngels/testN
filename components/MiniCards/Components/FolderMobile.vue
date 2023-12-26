<template>
  <nuxt-link :to="`/new/${folder.mark.slug}/${folder.slug}`"
             class="mini-card mini-card__folder">
    <div class="mini-card__folder-title">
      {{ folder.mark.title }} {{ folder.title }}
    </div>
    <div class="mini-card__folder-prices">
      От {{ numberFormat(folder.min_price) }} ₽
    </div>

    <img class="mini-card__folder-image" :src="folder.exterior_images[0].medium_webp" :alt="folder.title">

    <div class="mini-card__folder-colors" v-if="folder.colors">
      <div v-for="color in folder.colors" class="mini-card__folder-color"
           :style="{'backgroundColor':color.hex_code}"></div>
    </div>
    <Tech :tech="currentTech"/>
    <div class="mini-card__folder-controls">
      <div class="button button--active">
        Подробнее
      </div>
      <div class="button button--active-light" v-if="folder.availability">
        В наличии
      </div>
      <div class="button button--active-light" v-else-if="folder.arrival">
        Скоро в наличии
      </div>
      <div class="button button--active-light" v-else-if="!folder.availability">
        Нет в наличии
      </div>

    </div>
  </nuxt-link>
</template>


<script setup lang="ts">
import Tech from '~/components/Tech';
import {FolderType} from "~/apollo/queries/new/folders";
import {creditPrice, numberFormat} from "~/helpers/filters";
import {useCatalog} from "~/store/catalog";
import {CreditFolderType, useCredit} from "~/store/credit";
import {useSiteConfig} from "~/store/siteConfig";
import {computed} from "@vue/reactivity";

const props = defineProps<{
  folder: FolderType;
}>();

const isRangeRover = computed(() => {
  return props.folder.slug.indexOf('range-rover') >= 0
})
const currentTech = computed(() => {
  return {
    engine_power: props.folder.engine_power,
    time: props.folder.time,
    max_speed: props.folder.max_speed,
  }
})
const colorTheme = computed(() => useCatalog().colorTheme);
const settings = useSiteConfig().settings;

const creditStyles = computed(() => {
  if (colorTheme.value.slug === "default") {
    return false;
  } else {
    return {
      background: `${colorTheme.value?.main}`,
      borderColor: `${colorTheme.value?.main}`,
    };
  }
});

const exchangeStyles = computed(() => {
  if (colorTheme.value.slug === "default") {
    return false;
  } else {
    return {
      borderColor: `${colorTheme.value?.main}`,
      color: `${colorTheme.value?.main}`,
    };
  }
});
const setCreditFolder = async (data: CreditFolderType) =>
    useCredit().setCreditFolder(data);
const router = useRouter();
const onExchange = () => {
  setCreditFolder({
    mark_slug: props.folder.mark.slug,
    folder_slug: props.folder.slug,
  });
  router.push({path: "/exchange-n", query: {category: "exchange"}});
};
const onCredit = () => {
  setCreditFolder({
    mark_slug: props.folder.mark.slug,
    folder_slug: props.folder.slug,
  });
  router.push({path: "/credit-n", query: {category: "credit"}});
};
</script>