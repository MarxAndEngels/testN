<template>
  <div class="section section--contacts section--margin-40">
    <div class="contacts">
      <div class="contacts__map">
        <Map/>
      </div>
      <div class="contacts__info">
        <div class="contacts__info-item" v-if="settings.contact_schedule">
          {{ settings.contact_schedule }}
        </div>
        <div class="contacts__info-item" v-if="settings.contact_address">
          {{ settings.contact_address }}
        </div>
        <div class="contacts__info-item">
          метро Аннино
        </div>
        <Phone number class="contacts__info-item"/>
        <!--          <button class="button button&#45;&#45;primary">ОБРАТНЫЙ ЗВОНОК</button>-->
      </div>
      <div class="contacts__lines">
        <div class="contacts__line"></div>
        <div class="contacts__line"></div>
        <div class="contacts__line"></div>
        <div class="contacts__line"></div>
      </div>
    </div>
  </div>
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