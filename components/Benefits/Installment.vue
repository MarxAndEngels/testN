<template>
  <div class="benefits">
    <div class="benefits__line">
      <div class="benefits__item"
           v-for="(benefit, index) in benefits" :key="index"
           @click="openModalHandler(benefit.text ,benefit.description)">
        <!--                <svg-icon :name="`benefits/${benefit.slug}`"/>-->
        <div class="benefits__item-title"> {{ benefit.text }}</div>
        <div class="benefits__item-description"> {{ benefit.description }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "#imports"
import {BenefitType} from "~/app/types/benefit";
import {useModals} from "~/store/modals";

const benefits: BenefitType[] = [
  {
    slug: 'credit-sale',
    text: 'Скидка за рассрочку',
    description: 'При оформлении автомобиля в рассночку Вам предоставляется дополнительная скидка в размере до 300 000 ₽ от изначальной стоимости автомобиля.'
  },
  {
    slug: 'guarantee',
    text: 'гарантия 5 лет или 150 000 км',
    description: 'Автоцентр предоставляет гарантию на техническое состояние автомобиля в течение одного года с момента покупки.'
  },
  {
    slug: 'percent',
    text: 'ставка 0%',
    description: 'Вы можете приобрести автомобиль в рассрочку при первоначальном взносе от 10%.'
  },
  {
    slug: 'docs',
    text: 'По 2 документам',
    description: 'Для оформления автомобиля в рассрочку Вам потребуются только паспорт и водительское удостоверение.'
  }

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