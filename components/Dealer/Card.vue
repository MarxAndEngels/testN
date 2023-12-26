<template>
  <div class="dealer__card">
    <div class="dealer__card-title">{{ settings.dealer_name }}</div>
    <div class="dealer__card-info">
      <div class="dealer__card-info-line" v-if="settings.contact_phone">
        <div class="dealer__card-info-title">Телефон:</div>
        <div class="dealer__card-info-value">{{ settings.contact_phone }}</div>
      </div>
      <div class="dealer__card-info-line" v-if="settings.contact_address">
        <div class="dealer__card-info-title">Адрес:</div>
        <div class="dealer__card-info-value">{{ settings.contact_address }}</div>
      </div>
      <div class="dealer__card-info-line" v-if="settings.contact_schedule">
        <div class="dealer__card-info-title">График работы:</div>
        <div class="dealer__card-info-value">{{ settings.contact_schedule }}</div>
      </div>
    </div>
    <img class="dealer__card-photo" src="/img/slider/about/slide-1@1x-mobile.webp" alt="dealer">
  </div>
</template>
<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import Picture from "~/components/Picture/index.vue";

const settings = useSiteConfig().settings
</script>
