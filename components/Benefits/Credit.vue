<template>
  <div class="benefits">
    <div class="benefits__line">
      <div class="benefits__item"
           v-for="(benefit, index) in benefits" :key="index"
           @click="openModal(benefit.description)">
        <nuxt-icon :name="`benefits/${benefit.slug}`"/>
        <div class="benefits__item-text"> {{ benefit.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "#imports"
import {BenefitType} from "~/app/types/benefit";

let modal = ref<boolean>(false)
let description = ref<string>('')

const benefits: BenefitType[] = [
  {
    slug: 'gift',
    text: 'КАСКО и комлект резины в подарок',
    description: 'При оформлении автомобиля в кредит Вам предоставляется дополнительная скидка в размере до 300 000 ₽ от изначальной стоимости автомобиля.'
  },
  {
    slug: 'guarantee',
    text: 'гарантия 5 лет или 150 000 км',
    description: 'Автоцентр предоставляет гарантию на техническое состояние автомобиля в течение одного года с момента покупки.'
  },
  {
    slug: 'percent',
    text: 'автокредит 4.9%',
    description: 'Вы можете приобрести автомобиль в кредит без первоначального взноса, однако, чем больше взнос, тем лучше условия по кредиту.'
  },
  {
    slug: 'docs',
    text: 'По 2 документам',
    description: 'Для оформления автомобиля в кредит Вам потребуются только паспорт и водительское удостоверение.'
  }

]


const openModal = async (benefit: string) => {
  description.value = benefit
  modal.value = true
}
const closeModal = async () => {
  description.value = ''
  modal.value = false
}

</script>