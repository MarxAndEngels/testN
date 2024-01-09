<template>
  <div class="form">
    <div class="form__title">
      Желаемый автомобиль
    </div>
    <div class="form__controls">
      <div class="form__controls-item">
        <Select has-alphabet @select="handlerSelect" :options="marks" title="Марка" type="mark" :value="mark"/>
      </div>
      <div class="form__controls-item">
        <Select has-alphabet @select="handlerSelect" :options="folders" title="Модель" type="folder"
                :value="chosenFolder"/>
      </div>
      <div class="form__controls-item">
        <Select @select="handlerSelect" :options="complectations" title="Комплектация" type="complectation"
                :value="complectation"/>
      </div>
      <div class="form__controls-item" v-if="colors && colors.length">
        <div class="form__controls-item-title">Цвет:</div>
        <FolderColors :active-color="colors[currentColor]" @change-color="changeColor" :colors="colors"/>
      </div>
    </div>
    <div class="form__offer" v-if="folder">
      <div class="form__offer-title">
        {{ folder.mark.title }} {{ folder.title }}
      </div>
      <div class="form__offer-prices">
        {{ numberFormat(complectation.price) }} ₽
      </div>
      <img class="form__offer-image" :src="colors[currentColor].image.medium_webp"
           :alt="`${folder.mark.title} ${folder.title}`">
    </div>
    <div class="form__calculator" v-if="hasCredit">
      <div class="form__title">
        Кредитные условия
      </div>
      <CalculatorIndex @change-payment="changePayment"
                       @change-period="changePeriod"
                       :payment="payment"
                       :period="period"/>
      <div class="form__calculator-info">
        <div class="form__calculator-info-item">
          <div class="form__calculator-info-title">
            Ваша ставка:
          </div>
          <div class="form__calculator-info-value">
            4.9%
          </div>
        </div>
        <div class="form__calculator-info-item">
          <div class="form__calculator-info-title">
            Ежемесячный платеж:
          </div>
          <div class="form__calculator-info-value">
            {{ total }} ₽
          </div>
        </div>
      </div>
    </div>
    <div class="form__controls">
      <div class="form__title">
        Ваш автомобиль
      </div>
      <div class="form__controls-item">
        <Input :value="form.client_mark"
               @update:modelValue="newValue => form.client_mark = newValue" placeholder="Марка" :error="false"/>
      </div>
      <div class="form__controls-item">
        <Input :value="form.client_folder"
               @update:modelValue="newValue => form.client_folder = newValue" placeholder="Модель" :error="false"/>
      </div>
      <div class="form__controls-item">
        <Input mask="number" :value="form.client_year"
               @update:modelValue="newValue => form.client_year = newValue" placeholder="Год" :error="false"/>
      </div>
    </div>
    <div class="form__personal">
      <div class="form__title">
        Укажите свои данные
      </div>
      <div class="form__controls-item" :class="{'error':error === 'name'}">
        <Input :value="form.name"
               @update:modelValue="newValue => form.name = newValue" placeholder="ФИО" :error="false"/>
      </div>
      <div class="form__controls-item" :class="{'error':error === 'phone'}">
        <Input :value="form.phone"
               @update:modelValue="newValue => form.phone = newValue" placeholder="Телефон" type="tel" mask="phone"
               :error="false"/>
      </div>
      <div class="form__controls-item">
        <div class="checkboxes">
          <Checkbox v-model="form.agree1" title="Подтверждаю наличие гражданства РФ" :error="error === 'agree1'"/>
          <Checkbox v-model="form.agree2" title="Согласен на обработку личных данных" :error="error === 'agree2'"/>
        </div>
      </div>
      <div class="form__controls-item">

        <div class="form__control-error" v-if="error==='client_mark'">
          Укажите марку Вашего автомобиля
        </div>
        <div class="form__control-error" v-if="error==='client_folder'">
          Укажите модель Вашего автомобиля
        </div>
        <div class="form__control-error" v-if="error==='client_year'">
          Укажите год Вашего автомобиля
        </div>

        <div class="form__control-error" v-if="error==='mark'">
          Выберите марку
        </div>
        <div class="form__control-error" v-if="error==='folder'">
          Выберите модель
        </div>
        <div class="form__control-error" v-if="error==='name'">
          Заполните поле ФИО
        </div>
        <div class="form__control-error" v-if="error==='phone'">
          Заполните поле Телефон
        </div>
        <div class="form__control-error" v-if="error==='agree1'">
          Подтвердите наличие гражданства РФ
        </div>
        <div class="form__control-error" v-if="error==='agree2'">
          Необходимо согласие на обработку личных данных
        </div>
        <button :class="{'button--error':error==='mark' || error==='folder'}"
                @click="submit"
                class="button button--active">Оставить заявку
        </button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Select from '~/components/Controls/Select.vue'
import Input from '~/components/Controls/Input.vue'
import CalculatorIndex from '~/components/Form/Calculator/index.vue'
import Checkbox from '~/components/Controls/Checkbox.vue'
import {computed, ref} from "#imports";
import {NewOfferType} from "~/apollo/queries/new/newOffers";
import {requestCatalogFolder, sendNewFeedback} from "~/helpers/request";
import {cheaperComplectation, numberFormat} from "~/helpers/filters";
import {calculate} from "~/helpers/calculate";
import {CreditFolderType, useCredit} from "~/store/credit";
import {FolderPageInput, FolderPageType} from "~/apollo/queries/new/folder";
import {SendNewFeedback} from "~/apollo/mutations/newFeedback";
import {useSiteConfig} from "~/store/siteConfig";
import {CatalogType} from "~/apollo/queries/siteConfig";
import FolderColors from "~/components/Folder/Colors.vue";
import {vkAdsReachGoal, yandexCommercialNew} from "~/helpers/metrika";

// ПЕРЕМЕННЫЕ ДЛЯ РАБОТЫ С СЕЛЕКТАМИ -----------------------------
let hasCredit = ref<boolean>(false)
let chosenOffer = ref<NewOfferType>()
const route = useRoute()
const router = useRouter()
const marks = useSiteConfig().catalog
let mark = ref<CatalogType>()
let folders = computed(() => {
  return mark.value?.folders || []
})
let complectations = computed(() => {
  let complectations: any[] = []
  folder.value?.modifications.forEach(item => {
    item.complectations.map(complectation => {
      complectations.push({
        id: complectation.id,
        modification_id: item.id,
        title: `${item.title} ${complectation.title} ${numberFormat(complectation.price)} ₽`,
        price: complectation.price
      })
    })
  })
  return complectations
})


let colors = computed(() => {
  return folder.value ? folder.value?.colors : []
})
let currentColor = ref<number>(0)

const changeColor = async (index: number) => {
  currentColor.value = index;
};


let complectation = ref()
let folder = ref<FolderPageType | null>()
let chosenFolder = ref()
let variables = computed<FolderPageInput>(() => {
  return {
    mark_slug: mark.value ? <string>mark.value.slug : null,
    slug: chosenFolder.value ? <string>chosenFolder.value.slug : null,
  }
})

const request = async () => {
  const {pending, data} = await requestCatalogFolder(variables.value)
  folder.value = data.value?.folder
}

//КАЛЬКУЛЯТОР ----------------------------------------------------
let payment = ref(10)
let period = ref(96)

let total = ref()

const settings = useSiteConfig().settings
const changePayment = async (value: any) => {
  payment.value = value
  total.value = calculate(complectation.value?.price, payment.value, period.value)
}
const changePeriod = async (value: any) => {
  period.value = value
  total.value = calculate(complectation.value?.price, payment.value, period.value)
}
//ЛОГИКА КОГДА ПЕРЕХОДИТ НА СТРАНИЦУ ИЗ КАРТОЧКИ
const creditFolder = useCredit().creditFolder

if (creditFolder) {
  const {pending, data} = await requestCatalogFolder({
    mark_slug: creditFolder.mark_slug,
    slug: creditFolder.folder_slug,
  })
  folder.value = data.value?.folder

  watch(data, () => {
    folder.value = data.value?.folder
    mark.value = marks.find(item => item.slug === folder.value?.mark.slug)
    chosenFolder.value = mark.value?.folders.find(item => item.slug === folder.value?.slug)
    complectation.value = complectations.value[0]
    total.value = calculate(complectation.value?.price, payment.value, period.value)
  })

}


//РУЧНОЙ ВЫБОР АВТОМОБИЛЯ
const handlerSelect = async (option: any) => {
  if (option.type === 'mark') {
    mark.value = option.option
    folder.value = null
    chosenFolder.value = null
    complectation.value = null
    currentColor.value = 0
  }
  if (option.type === 'folder') {
    chosenFolder.value = option.option
    complectation.value = null
    currentColor.value = 0
    await request().then(() => {
      //по умолчанию выбрана первая комплектация
      complectation.value = complectations.value[cheaperComplectation(folder.value?.modifications).index]
      total.value = calculate(complectation.value?.price, payment.value, period.value)
    })

  }
  if (option.type === 'complectation') {
    complectation.value = option.option
    total.value = calculate(complectation.value?.price, payment.value, period.value)
  }
  error.value = ''
}


// ФОРМА-------------------------------ФОРМА-------------------------------ФОРМА


let form = ref({
  client_mark: '',
  client_folder: '',
  client_year: '',
  name: '',
  phone: '',
  agree1: true,
  agree2: true,
})

let error = ref<string>('')
let modalOpen = ref<boolean>(false)

watch(form.value, () => {
  error.value = ''
})
const offerTitle = computed(() => {
  //offer_title - Марка Модель, ТипКузова, Модификация, Комплектация. ТипДвигателя, Привод, КПП.
  let title = `${folder.value?.mark.title} ${folder.value?.title},`
  title += `${folder.value?.bodyType.title},`
  title += `${complectation.value.title},`
  return title
})
const submit = async () => {
  if (form.value.client_mark.length < 1) {
    error.value = 'client_mark'
    return false
  }
  if (form.value.client_folder.length < 1) {
    error.value = 'client_folder'
    return false
  }
  if (form.value.client_year.length < 2) {
    error.value = 'client_year'
    return false
  }
  if (!mark.value?.slug) {
    error.value = 'mark'
    return false
  }
  if (!chosenFolder.value?.slug) {
    error.value = 'folder'
    return false
  }
  if (form.value.name.length < 1) {
    error.value = 'name'
    return false
  }
  if (form.value.phone.length < 1 || form.value.phone.split('_').length > 1) {
    error.value = 'phone'
    return false
  }
  if (!form.value.agree1) {
    error.value = 'agree1'
    return false
  }
  if (!form.value.agree2) {
    error.value = 'agree2'
    return false
  }
  let variables = ref<SendNewFeedback>({
    comment: hasCredit.value ? 'с кредитом' : 'не в кредит',
    type_enum: 'TRADE-IN',
    client_vehicle_mark: form.value.client_mark,
    client_vehicle_model: form.value.client_folder,
    client_vehicle_year: form.value.client_year,
    client_name: form.value.name,
    client_phone: form.value.phone,
    credit_initial_fee: payment.value + ' %',
    credit_period: period.value + ' мес.',

    folder_id: folder.value?.id,
    color_id: colors.value[currentColor.value].id,
    modification_id: complectation.value.modification_id,
    complectation_id: complectation.value.id
  })
//UTM метки
  if (localStorage.utm_source) {
    variables.value.utm_source = localStorage.utm_source
  }
  if (localStorage.utm_medium) {
    variables.value.utm_medium = localStorage.utm_medium
  }
  if (localStorage.utm_campaign) {
    variables.value.utm_campaign = localStorage.utm_campaign
  }
  if (localStorage.utm_term) {
    variables.value.utm_term = localStorage.utm_term
  }
  if (localStorage.utm_content) {
    variables.value.utm_content = localStorage.utm_content
  }
  //
  const {mutate: feedback} = await sendNewFeedback(variables.value);
  try {
    await feedback(variables.value)
    await yandexCommercialNew({
      counter_commercial_id: settings.counter_commercial_id,
      id: folder.value?.id,
      mark: folder.value?.mark.title,
      folder: folder.value?.title,
      modification: complectation.value.title,
      price: folder.value?.min_price
    }, true)
    await vkAdsReachGoal(settings.counter_vk, folder.value?.min_price, folder.value?.id, true);
    await router.push('/thanks-n')
  } catch (e) {
    console.log(e)
  }
}


// ОЧИЩАЮ СТОР ПОСЛЕ ТОГО КАК ПЕРЕШЕЛ СО СТРАНИЦЫ-----------------------------------------------
const setCreditFolder = async (data: CreditFolderType) => useCredit().setCreditFolder(data)
onUnmounted(() => {
  setCreditFolder(null)
})
</script>
