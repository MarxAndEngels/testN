<template>
  <div class="benefits__modal" v-if="modal.modalText.open">
    <div class="benefits__modal-bg" @click="modal.closeModalText()">
    </div>
    <div class="benefits__modal-content">

      <div class="benefits__modal-close" @click="modal.closeModalText()">×</div>
      <p v-if="modal.modalText.title" class="benefits__modal-title">
        {{ modal.modalText.title }}
      </p>
      <p class="benefits__modal-text" v-if="modal.modalText.text">
        {{ modal.modalText.text }}
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useModals} from "~/store/modals";

const modal = useModals()

</script>
