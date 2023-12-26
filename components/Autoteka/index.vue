<template>
  <div class="autoteka" v-if="offer">
    <img class="autoteka__logo" src="/img/autoteka/autoteka.svg" alt="autoteka">
    <div class="autoteka__info">
      <div class="autoteka__header">
        <div class="autoteka__title">
          Отчёт куплен на сайте Autoteka.ru
        </div>
        <div class="autoteka__description">
          Автотека - сервис по проверке автомобиля по VIN
        </div>
        <div class="autoteka__date">
          Отчет от
          <span>
						{{ offer.createdAt }}
					</span>
        </div>
      </div>
      <div class="autoteka__offer">
        <div class="autoteka__offer-title">
          {{ offer.name }}
        </div>
        <div class="autoteka__offer-info">
          <div class="autoteka__offer-line" v-if="offer.vin">
            <div>
              vin
            </div>
            <div>
              {{ offer.vin }}
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Госномер
            </div>
            <div>
              Отсутствует
            </div>
          </div>
          <div class="autoteka__offer-line" v-if="offer.vin">
            <div>
              Номер кузова
            </div>
            <div>
              {{ offer.vin }}
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Год выпуска
            </div>
            <div>
              {{ offer.year }} г.
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Тип ТС
            </div>
            <div>
              {{ offer.bodyType.title }}
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Цвет
            </div>
            <div>
              {{ offer.color.title }}
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Объём двигателя
            </div>
            <div>
              {{ offer.engine_volume }} л.
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Мощность
            </div>
            <div>
              {{ offer.engine_power }} л.с.
            </div>
          </div>
          <div class="autoteka__offer-line">
            <div>
              Последний пробег
            </div>
            <div>
              {{ offer.run }} км
            </div>
          </div>
        </div>
      </div>
      <div class="autoteka__blocks">
        <div class="autoteka__block"
             v-for="(item, index) in items"
             :key="index">
          <div class="autoteka__block-title">
            {{ item.title }}
          </div>
          <div class="autoteka__block-text"
               v-if="item.text">{{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {OfferPageType} from "~/apollo/queries/offer/offer";
import {numberFormat} from "~/helpers/filters";
import {off} from "inputmask/lib/dependencyLibs/events";

const props = defineProps<{
  offer: OfferPageType | null
}>()

type offerInfoType = {
  name: string
  slug?: string
  postfix?: string
  default?: string
  format?: boolean
}
type itemType = {
  title: string
  text?: string
  isOpen: boolean
}
const items = ref<itemType[]>([
  {
    title: 'Не найдены ограничения на регистрацию',
    text: 'Запрет регистрационных действий на машину накладывается, если у автовладельца есть неоплаченные штрафы и налоги, либо если имущество стало предметом спора.',
    isOpen: false,
  },
  {
    title: 'Нет сведений о розыске',
    text: 'Покупка разыскиваемого автомобиля грозит тем, что его отберут в ГИБДД при регистрации, и пока будет идти следствие, а это может затянуться на долгий срок, автомобиль будет стоять на штрафплощадке.',
    isOpen: false,
  },
  {
    title: 'Залог не найден',
    text: 'Мы проверили базы данных Федеральной нотариальной палаты (ФНП) и Национального бюро кредитных историй (НБКИ).',
    isOpen: false,
  },
  {
    title: `${props.offer?.owner.title} по ПТС`,
    text: '',
    isOpen: false,
  },
  {
    title: 'ДТП не найдены',
    text: 'В отчёт не попадут аварии, которые произошли раньше 2015 года или не оформлялись в ГИБДД.',
    isOpen: false,
  },
  {
    title: 'Не найдены расчёты стоимости ремонта',
    text: 'Мы проверяем, во сколько эксперты страховых компаний оценили восстановление автомобиля после ДТП. Расчёт не означает, что машину ремонтировали.',
    isOpen: false,
  },
  {
    title: 'Не найдено разрешение на работу в такси',
    text: 'Данные представлены из региональных баз по регистрации автомобиля в качестве такси.',
    isOpen: false,
  },
  {
    title: 'Не найдены сведения об использовании в каршеринге',
    text: 'На каршеринговых авто ездят практически круглосуточно. Они много времени проводят в пробках — от этого двигатель и сцепление быстро изнашиваются. Салон тоже страдает от большого количества водителей и пассажиров.',
    isOpen: false,
  },
  {
    title: 'Не найдены сведения о диагностике',
    text: 'В блоке представлены данные по оценке состояния автомобиля по результатам офлайн диагностики. В ходе диагностики специалисты проверяют состояние ЛКП, всех конструкций автомобиля, состояние салона, фактическую комплектацию и проводят небольшой тест-драйв.',
    isOpen: false,
  },
  {
    title: 'Не найдены сведения о техосмотрах',
    text: 'В данном блоке отображаются данные о прохождении техосмотра на основании данных диагностических карт ТС. Срок прохождения технического осмотра для автомобилей категории «B»: — первые четыре года — не требуется; — возраст от 4 до 10 лет — каждые 2 года; — старше 10 лет — ежегодно.',
    isOpen: false,
  },
  {
    title: 'Нет сведений о ввозе из-за границы',
    text: 'Данные из таможенной декларации, которую заполняет компания, осуществляющая ввоз транспортного средства на территорию РФ.',
    isOpen: false,
  },
  {
    title: 'Нет полиса ОСАГО',
    isOpen: false,
  },
  {
    title: 'Не найдены сведения об отзывных кампаниях',
    text: 'Для данного автомобиля не проводилось или нет действующих отзывных кампаний. Отзыв автомобиля представляет собой устранение выявленного брака. Практически все автомобильные производители периодически отзывают свои продукты для устранения дефектов.',
    isOpen: false,
  },
])
</script>