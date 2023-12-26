<template>
  <CardFolderMobile v-if="isMobile" :folder="folder"/>
  <CardFolderDesktop v-else :folder="folder"/>
</template>
<script setup lang="ts">
import CardFolderDesktop from '~/components/MiniCards/Components/FolderDesktop.vue'
import CardFolderMobile from '~/components/MiniCards/Components/FolderMobile.vue'
import {FolderType} from "~/apollo/queries/new/folders";
import {creditPrice, numberFormat} from "~/helpers/filters";
import {useCatalog} from "~/store/catalog";
import {CreditFolderType, useCredit} from "~/store/credit";
import {useSiteConfig} from "~/store/siteConfig";

const props = defineProps<{
  folder: FolderType;
}>();
const {isMobile, isDesktop} = useDevice();

const isRangeRover = computed(() => {
  return props.folder.slug.indexOf('range-rover') >= 0
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