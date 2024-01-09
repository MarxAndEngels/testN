<template>
  <div class="benefits">
    <div class="benefits__line">
      <div
        class="benefits__item"
        v-for="(benefit, index) in benefits"
        :key="index"
        @click="openModalHandler(benefit.text ,benefit.description)"
      >
        <!--                <svg-icon :name="`benefits/${benefit.slug}`"/>-->
        <div class="benefits__item-title">{{ benefit.text }}</div>
        <div class="benefits__item-description">{{ benefit.description }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "#imports";
import { BenefitType } from "~/app/types/benefit";
import {useModals} from "~/store/modals";


const benefits: BenefitType[] = [
  {
    slug: "trade-in-sale",
    text: "Выгодный trade-in",
    description: "При обмене автомобиля Вам предоставляется дополнительная выгода в размере до 200 000 ₽ от изначальной стоимости автомобиля.",
  },
  {
    slug: "guarantee",
    text: "Trade-in как взнос",
    description:
      "Используйте свой автомобиль в качестве первого взноса по автокредиту со скидкой на новый автомобиль до 300 000 ₽.",
  },
  {
    slug: "market-value",
    text: "Рыночная оценка",
    description: "Оценка вашего автомобиля будет на 100% рыночной, всю сумму можно использовать для покупки нового автомобиля.",
  },
  {
    slug: "docs",
    text: "По 2 документам",
    description: "Для обмена автомобиля по Trade-In Вам потребуются только паспорт и водительское удостоверение.",
  },
];

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