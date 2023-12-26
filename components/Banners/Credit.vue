<template>
  <div class="banner banner--credit">
    <Picture custom-class="banner__img" img="/img/banners/credit/banner"/>
    <div class="container">
      <div class="banner__title">
        автокредит
      </div>
      <div class="banner__text">
        Выгодное автокредитование со ставкой от 4.9%
      </div>
      <div class="banner__buttons">
        <button @click="onExpress" class="button  button--primary">
          ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Picture from '~/components/Picture'
import {useModals} from "~/store/modals";


const onExpress = () => {
  useModals().openModal({
    open: true,
    title: 'Заявка на автокредит',
    type: 'express'
  })
}
</script>
