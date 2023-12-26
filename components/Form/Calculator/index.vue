<template>
  <div class="calculator">
    <div class="calculator__block">
      <div class="calculator__line">
        <div class="calculator__line-name">{{ installment ? `Период рассрочки:` : `Срок кредитования:` }}</div>
        <div class="calculator__line-value">{{ periodValue }}
          {{ declension(periodValue, 'месяц', 'месяца', 'месяцев') }}
        </div>
      </div>
      <div class="calculator__slider">
        <Slider :lazy="false" v-model="periodValue" :options="periodOptions"/>
        <div class="calculator__slider-steps calculator__slider-steps-period"
             :class="{ 'calculator__slider-steps-period--installment': installment }">
          <div v-if="installment" class="calculator__slider-step" v-for="i in 7"></div>
          <div v-else class="calculator__slider-step" v-for="i in 10"></div>
        </div>
      </div>
    </div>
    <div class="calculator__block">
      <div class="calculator__line">
        <div class="calculator__line-name">Первый взнос:</div>
        <div class="calculator__line-value">{{ paymentValue }}%</div>
      </div>
      <div class="calculator__slider">
        <Slider :lazy="false" v-model="paymentValue" :step="10" :options="paymentOptions"/>
        <div class="calculator__slider-steps calculator__slider-steps-payment"
             :class="{ 'calculator__slider-steps-payment--installment': installment }">
          <div v-if="installment" class="calculator__slider-step" v-for="i in 7"></div>
          <div v-else class="calculator__slider-step" v-for="i in 9"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Slider from '@vueform/slider'
import {declension} from "~/helpers/declension";

const emit = defineEmits(['changePayment', 'changePeriod'])

const props = defineProps<{
  installment?: boolean
  payment: number,
  period: number,
}>()

const paymentValue = computed({
  get: () => props.payment,
  set: (value) => emit('changePayment', value)
})
const periodValue = computed({
  get: () => props.period,
  set: (value) => emit('changePeriod', value)
})

const periodOptions = computed(() => {
  if (props.installment) {
    return {
      snap: true,
      range: {
        'min': 2,
        '19%': 6,
        '35%': 12,
        '52%': 24,
        '68%': 36,
        '85%': 48,
        'max': 60,
      }
    }
  } else {
    return {
      snap: true,
      range: {
        'min': 2,
        '11%': 6,
        '22%': 12,
        '33%': 24,
        '44.5%': 36,
        '55.5%': 48,
        '66.5%': 60,
        '77.5%': 72,
        '88.5%': 84,
        'max': 96
      }
    }
  }

})
const paymentOptions = computed(() => {
  if (props.installment) {
    return {
      snap: true,
      range: {
        'min': 10,
        '19%': 20,
        '35%': 30,
        '52%': 40,
        '68%': 50,
        '85%': 60,
        'max': 70,
      }
    }
  } else {
    return {
      snap: true,
      range: {
        'min': 0,
        '12.5%': 10,
        '25%': 20,
        '37.5%': 30,
        '50%': 40,
        '62,.5%': 50,
        '74.5%': 60,
        '87%': 70,
        'max': 80
      }
    }
  }

})

</script>