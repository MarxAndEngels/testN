<template>
  <footer class="footer">
    <div class="container">
      <div class="page-footer__top">
        <div class="page-footer__wrapper page-footer__wrapper--contacts">
          <Phone number class="footer__phone"/>
        </div>
        <div class="page-footer__wrapper">
          <div class="page-footer__title">Компания</div>
          <ul class="page-footer__link-list">
            <li class="page-footer__link-item">
              <nuxt-link to="/about">О компании</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="page-footer__wrapper">
          <div class="page-footer__title">Купить автомобиль</div>
          <ul class="page-footer__link-list">
            <li class="page-footer__link-item">
              <nuxt-link :to="`/new`">Каталог</nuxt-link>
            </li>
            <li class="page-footer__link-item">
              <nuxt-link to="/credit-n">Заявка на автокредит</nuxt-link>
            </li>
            <li class="page-footer__link-item">
              <nuxt-link to="/exchange-n">Trade-in</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="page-footer__wrapper">
          <div class="page-footer__title">Популярные марки</div>
          <ul class="page-footer__link-list">
            <li class="page-footer__link-item">
              <nuxt-link :to="`/new/hyundai`">Hyundai</nuxt-link>
            </li>
            <li class="page-footer__link-item">
              <nuxt-link :to="`/new/kia`">KIA</nuxt-link>
            </li>
            <li class="page-footer__link-item">
              <nuxt-link :to="`/new/toyota`">Toyota</nuxt-link>
            </li>
          </ul>
        </div>
      </div>


      <div class="page-footer__bottom footer__text footer__text--border-bottom">
        <div class="footer__copy">
          <!--          {{ new Date().getFullYear() }} г. «{{ settings.dealer }}»-->
        </div>
        <p class="text__p--footer">
          Данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является
          публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса РФ. Для получения
          подробной информации о наличии и стоимости указанных товаров и (или) услуг, пожалуйста, обращайтесь
          к менеджерам автосалона.
        </p>

      </div>
      <div class="footer__text">
        <p class="text__p--footer">
          Годовая ставка автокредита варьируется от 4,9% до 16,5% и зависит от конкретного банка, суммы займа
          и кредитной программы. Минимальный срок погашения от 61 дня, максимальный - 96 месяцев. При этом
          любые дополнительные комиссии не взимаются.
        </p>
        <p class="text__p--footer">
          В случае невозвращения в условленный срок суммы автокредита или суммы процентов по автокредиту
          банк-партнер оставляет за собой право начислить штраф за просрочку платежа в среднем размере 0,1% от
          первоначальной суммы автокредита. При несоблюдении условий погашения автокредита данные о нарушителе
          могут быть переданы в специальный реестр должников и коллекторское агентство для взыскания
          задолженности.
        </p>
        <p class="text__p--footer">
          Кредит предоставляется банком АО «Тинькофф Банк» (Лицензия ЦБ РФ № 2673 от 24.03.2015).
        </p>
      </div>
      <ul class="footer__legal" v-if="settings.legal_name">
        <li class="footer__legal-item">{{ settings.legal_name }}</li>
        <li class="footer__legal-item">
          ИНН: {{ settings.legal_inn }} / КПП: {{ settings.legal_kpp }} /
          ОГРН: {{ settings.legal_ogrn }}
        </li>
        <li class="footer__legal-item">
          Юр. адрес: {{ settings.legal_address }}
        </li>
        <li class="footer__legal-item">
          <nuxt-link to="/policy">Пользовательское соглашение</nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {useModals} from "~/store/modals";

const settings = useSiteConfig().settings;
let isNight = computed(() => useSiteConfig().isNight)

const phoneClick = () => {
  useModals().openModal({
    open: true,
    title: 'заявка на обратный звонок',
    type: 'express'
  })
}
</script>