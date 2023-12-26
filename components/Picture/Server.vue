<template>
  <picture>
    <source
        type="image/webp"
        media="(min-width: 768px)"
        :srcset="`${onexWebp} 1x, ${twoxWebp} 2x`"
    />
    <source
        media="(min-width: 768px)"
        :srcset="`${onex} 1x, ${twox} 2x`"
    />

    <source
        type="image/webp"
        :srcset="`${onexWebp} 1x, ${twoxWebp} 2x`"
    />
    <img
        @click.right.prevent
        :loading="lazy ? 'lazy' : ''"
        :class="customClass"
        :srcset="`${onex} 1x, ${twox} 2x`"
        alt=""
        :src="`${original}`"
    />
  </picture>
</template>

<script lang="ts" setup>
const props = defineProps<{
  onexWebp: string;
  twoxWebp: string;
  original: string;
  customClass?: string;
  onex: string;
  twox: string;
  lazy?: boolean;
}>();
</script>