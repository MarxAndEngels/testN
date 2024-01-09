<template>
  <div class="actions">
    <div class="actions__line">
      <div class="actions__item_wrap" v-for="item in actions">
        <div class="actions__item">
          <div class="actions__item-overflow"></div>
          <img :src="`/img/special/${item.image}`" alt="">
          <div class="actions__item-title">
            {{ item.title }}
          </div>
          <div class="actions__item-type">
            {{ item.type }}
          </div>
        </div>
        <div class="button button--action" @click="openModalHandler(item.title, item.description)">
          Подробнее
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useModals} from "~/store/modals";


let year = new Date().getFullYear()

let modalText = ref<string>("");
const actions =
    [
      {
        title: '«Выгодный Trade-In»',
        image: 'special-exchange.webp',
        type: 'Акция',
        description: `При обмене автомобиля вам предоставляется дополнительная выгода в размере до 200 000 ₽ от изначальной стоимости автомобиля.`,
        slug: 'exchange',
        textButton: 'Оставить заявку'
      },
      {
        title: '«Семейный автомобиль»',
        image: 'special-family.webp',
        type: 'Госпрограмма',
        description: `Юридическим основанием программы стали поправки, внесенные Постановлением Правительства РФ № 870 26.07.2018.
                    Предусматривается возмещение затрат на покупку нового автомобиля в размере 10 % от его стоимости. Таким образом, авто обойдется семье с двумя детьми на 10 % дешевле своей объявленной рыночной стоимости.
                    Цена авто вместе с опциями и страховкой не должна превышать 1 млн. руб..
                `,
        slug: '',
        textButton: 'Выбрать автомобиль'
      },
      {
        title: '«Подарок на выбор»',
        image: 'special-gift.webp',
        type: 'Акция',
        description: `При покупке нового автомобиля в кредит мы предлагаем покупателям подарок на выбор — КАСКО, комплект резины или дополнительный аксессуар.`,
        slug: 'credit',
        textButton: 'Выбрать автомобиль'
      },
      {
        title: '«Первый автомобиль»',
        image: 'special-first.webp',
        type: 'Госпрограмма',
        description: `Первый автомобиль в ${year} - особая программа, позволяющая воспользоваться государственным кредитованием транспортных средств в ${year} году обеспечивает выгодные условия:до 20% от общей суммы. Благодаря льготам, которые предлагает автокредитование, можно приобрести транспортное средство по максимально выгодным условиям. Это позволяет поддерживать спрос на покупку автомобилей, собираемых на территории Российской Федерации. Подобная программа была разработана еще в 2009 году и до сих пор успешно функционирует. `,
        slug: '',
        textButton: 'Выбрать автомобиль'
      },

    ]
const modal = useModals()

const openModalHandler = (title: string, text: string) => {
  let payload = {
    open: true,
    title: title.replace('</br>',''),
    text: text
  }
  useModals().openModalText(payload)
}


</script>