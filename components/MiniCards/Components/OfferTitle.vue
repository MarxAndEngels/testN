<template>
  <nuxt-link :to="link" class="mini-card__offer-title">
    {{ title }}
  </nuxt-link>
</template>
<script setup lang="ts">

const props = defineProps<{
  link: string;
  title: string;
}>();
</script>
