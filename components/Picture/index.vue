<template>
  <picture>
    <source
      type="image/webp"
      media="(min-width: 768px)"
      :data-srcset="`${img}@1x.webp 1x, ${img}@2x.webp 2x`"
    />
    <source
      media="(min-width: 768px)"
      :data-srcset="`${img}@1x.jpg 1x, ${img}@2x.jpg 2x`"
    />

    <source
      type="image/webp"
      :data-srcset="`${img}@1x-mobile.webp 1x, ${img}@2x-mobile.webp 2x`"
    />
    <img
      :loading="lazy ? 'lazy' : ''"
      :class="customClass"
      class="lazyload"
      :data-srcset="`${img}@1x-mobile.jpg 1x, ${img}@2x-mobile.jpg 2x`"
      alt=""
      :data-src="`${img}@1x-mobile.jpg`"
    />
  </picture>
</template>

<script lang="ts" setup>
const props = defineProps<{
  img: string;
  customClass?: string;
  type?: string;
  lazy?: boolean;
}>();
</script>