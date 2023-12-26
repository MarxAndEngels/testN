<template>
  <div v-if="modalOffer">
    <h3 class="heading heading--h3">
      {{ modalOffer.mark }}
      {{ modalOffer.folder }}
      {{ modalOffer.modification }}
      {{ numberFormat(modalOffer.price) }}
      ₽
    </h3>
    <div
        class="folder__modal-blocks"
        v-for="(item, index) in modalOffer.equipment"
        :key="index"
    >
      <div class="folder__modal-title">
        {{ item.title }}
      </div>
      <div class="folder__modal-values">
        <div
            class="folder__modal-value"
            v-for="(value, index) in item.values"
            :key="index"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useModals} from "~/store/modals";

const modalOffer = useModals().modalOffer
import {numberFormat} from "~/helpers/filters";
</script>