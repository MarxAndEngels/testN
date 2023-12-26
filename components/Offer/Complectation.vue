<template>
  <div class="offer__complectation">
    <div class="offer__complectation-equipment" v-for="equipment in complectation.equipment">
      <div class="offer__complectation-equipment-title offer__complectation-item">
        {{ equipment.title }}
      </div>
      <div class="offer__complectation-equipment-values">
        <div class="offer__complectation-item" v-for="item in equipment.values">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {OfferComplectationType} from "~/apollo/queries/new/newOffer";

const props = defineProps<{
  complectation: OfferComplectationType;
}>();
</script>
