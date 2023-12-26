<template>
  <div class="buy__options">
    <div class="buy__options-block">
      <div class="buy__options-top">
        <div class="buy__options-prices">
          <div class="buy__options-price buy__options-price--actual">{{ numberFormat(price) }} ₽</div>
          <div v-if="active" class="buy__options-price buy__options-price--old">{{ numberFormat(priceOld) }} ₽</div>
          <div v-else class="buy__options-price">Последняя цена</div>
        </div>
        <div v-if="active" class="buy__options-credit">от {{ creditPrice(price) }} ₽/месяц
          <span> без взноса </span>
        </div>
      </div>
      <div class="buy__options-bottom">
        <nuxt-icon name="checked" v-if="active"/>
        <div class="buy__options-dealer" v-if="active">
          В наличии в
          <br/>
          <span>{{ useSiteConfig().settings.dealer_name }}</span>
        </div>
        <div v-if="!active">Нет в наличии</div>
        <div class="button button--callback" @click="onCallback">Обратный звонок</div>
      </div>
    </div>
    <div class="buy__options-buttons" v-if="active">
      <button @click="onCredit" class="button button--active">Купить в кредит</button>
      <button @click="onExchange" class="button button--trade-in">Trade-In с выгодой</button>
    </div>
    <!--    <div class="buy__options-buttons" v-else>-->
    <!--      <button @click="onCallback" class="button button&#45;&#45;active">Оставить заявку</button>-->
    <!--    </div>-->

  </div>
</template>
<script setup lang="ts">
import {creditPrice, numberFormat} from "~/helpers/filters";
import {useModals} from "~/store/modals";
import {useSiteConfig} from "~/store/siteConfig";
const emit = defineEmits(['onCredit', 'onExchange'])
const props = defineProps<{
  price: number;
  priceOld: number;
  type: string
  active: boolean
}>();

const onCallback = () => {
  useModals().openModal({
    open: true,
    title: 'Заказать обратный звонок',
    type: 'express'
  })
};
const onCredit = () => {
  emit('onCredit')
}
const onExchange = () => {
  emit('onExchange')

}
</script>