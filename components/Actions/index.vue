<template>
  <div class="actions">
    <div class="actions__line">
      <div class="actions__item" v-for="item in actions">
        <div class="actions__item-overflow"></div>
        <img :src="`/img/special/${item.image}`" alt="">
        <div class="actions__item-title">
          {{ item.title }}
        </div>
        <div class="button button--action" @click="openTextModal(item.title, item.description)">
          Подробнее
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Picture from "~/components/Picture/index.vue";
import {useModals} from "~/store/modals";

let modalText = ref<string>("");
const actions =
    [
      {
        title: '«Trade-In со скидкой»',
        image: 'special-credit.webp',
        description: `Получите скидку при покупке нового автомобиля по программе Trade-In.`,
        slug: 'exchange',
        textButton: 'Оставить заявку'
      },
      {
        title: '«Семейный автомобиль»',
        image: 'special-family.webp',
        description: `Юридическим основанием программы стали поправки, внесенные Постановлением Правительства РФ № 870 26.07.2018.
                    Предусматривается возмещение затрат на покупку нового автомобиля в размере 10 % от его стоимости. Таким образом, авто обойдется семье с двумя детьми на 10 % дешевле своей объявленной рыночной стоимости.
                    Цена авто вместе с опциями и страховкой не должна превышать 1 млн. руб..
                `,
        slug: '',
        textButton: 'Выбрать автомобиль'
      },
      {
        title: '«Льготный автокредит»',
        image: 'special-first.webp',
        description: `Заполните кредитную заявку на любой новый автомобиль и получите льготную ставку плюс скидку.`,
        slug: 'credit',
        textButton: 'Выбрать автомобиль'
      },
      {
        title: '«Первый автомобиль»',
        image: 'special-trade.webp',
        description: `Первый автомобиль в 2023 - особая программа, позволяющая воспользоваться государственным кредитованием транспортных средств в 2023 году обеспечивает выгодные условия:до 20% от общей суммы. Благодаря льготам, которые предлагает автокредитование, можно приобрести транспортное средство по максимально выгодным условиям. Это позволяет поддерживать спрос на покупку автомобилей, собираемых на территории Российской Федерации. Подобная программа была разработана еще в 2009 году и до сих пор успешно функционирует. `,
        slug: '',
        textButton: 'Выбрать автомобиль'
      }
    ]
const openTextModal = (title: string, text: string) => {
  useModals().openModal({
    open: true,
    title: title,
    text: text,
    type: 'promotion-description'
  })
};

const onPromotion = () => {
  useModals().openModal({
    open: true,
    title: 'Получить предложение',
    type: 'promotion'
  })
};


</script>