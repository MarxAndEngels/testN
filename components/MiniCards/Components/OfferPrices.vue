<template>
  <div class="mini-card__offer-prices">
    <div class="mini-card__offer-price">
      {{ numberFormat(price) }} ₽
    </div>
    <div class="mini-card__offer-price mini-card__offer-price--old">
      {{ numberFormat(priceOld) }} ₽
    </div>
  </div>
</template>
<script setup lang="ts">

import {numberFormat} from "~/helpers/filters";

const props = defineProps<{
  price: number;
  priceOld: number;
}>();
</script>
