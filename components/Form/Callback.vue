<template>
  <div class="form">
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
               @update:modelValue="newValue => form.phone = newValue" placeholder="телефон" type="tel" mask="phone"
               :error="false"/>
      </div>
      <div class="form__controls-item">
        <div class="checkboxes">
          <Checkbox v-model="form.agree1" title="Подтверждаю наличие гражданства РФ" :error="error === 'agree1'"/>
          <Checkbox v-model="form.agree2" title="Согласен на обработку личных данных" :error="error === 'agree2'"/>
        </div>
      </div>
      <div class="form__controls-item">
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
import Input from "~/components/Controls/Input.vue";
import Checkbox from "~/components/Controls/Checkbox.vue";
import {ref} from "#imports";
import {sendNewFeedback} from '~/helpers/request'
import {useModals} from '~/store/modals'

// ФОРМА-------------------------------ФОРМА-------------------------------ФОРМА
import {SendNewFeedback} from "~/apollo/mutations/newFeedback";

const router = useRouter()
let form = ref({
  name: '',
  phone: '',
  agree1: true,
  agree2: true,
})

let error = ref<string>('')

watch(form.value, () => {
  error.value = ''
})
const submit = async () => {
  if (form.value.name.length < 1) {
    error.value = 'name'
    return false
  }
  if (form.value.phone.length < 1) {
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
    type_enum: 'CALLBACK',
    client_name: form.value.name,
    client_phone: form.value.phone
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
    await router.push('/thanks-n')
  } catch (e) {
    console.log(e)
  }
}


</script>
