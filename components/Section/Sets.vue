<template>
  <div class="sets">
    <nuxt-link :to="`/sets/${set.slug}`" class="set" v-for="set in currentSets">
      <div class="set__title">{{ set.title }}</div>
      <div class="set__number">{{ set.number }}</div>
      <picture>
        <source
            type="image/webp"
            media="(min-width: 768px)"
            :data-srcset="`/img/sets/set-${set.slug}@1x.webp 1x, /img/sets/set-${set.slug}@2x.webp 2x`"
        />
        <source
            media="(min-width: 768px)"
            :data-srcset="`/img/sets/set-${set.slug}@1x.png 1x, /img/sets/set-${set.slug}@2x.png 2x`"
        />

        <source
            type="image/webp"
            :data-srcset="`/img/sets/set-${set.slug}@1x.webp 1x, /img/sets/set-${set.slug}@2x.webp 2x`"
        />
        <img
            loading="lazy"
            class="lazyload set__image"
            :data-srcset="`/img/sets/set-${set.slug}@1x.png 1x, /img/sets/set-${set.slug}@2x.png 2x`"
            alt=""
            :data-src="`/img/sets/set-${set.slug}@1x.png`"
        />
      </picture>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";

type LocalSetType = {
  title: string;
  slug: string;
  number: string;
};

const localSets = ref<LocalSetType[]>([
  {
    title: "семейные",
    slug: "for-family",
    number: "01",
  },
  {
    title: "для такси",
    slug: "for-taxi",
    number: "02",
  },
  {
    title: "седаны",
    slug: "sedan",
    number: "03",
  },
  {
    title: "внедорожники",
    slug: "suv",
    number: "04",
  },
  {
    title: "китайские новинки",
    slug: "china-new",
    number: "05",
  },
]);
const sets = useSiteConfig().sets;
const currentSets = ref<LocalSetType[]>();
currentSets.value = localSets.value.filter((item) => {
  return sets.find((i) => i.slug === item.slug);
});
</script>