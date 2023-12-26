<template>
  <client-only>
    <YandexMap :zoom="16" class="map" style="width: 100%; height: 480px;" :controls="['trafficControl']"
      :coordinates="settings.contact_coordinates.split(',').map(item => Number(item))">
      <YandexMarker marker-id="2" :options="markerIcon" marker-type="placemark"
        :coordinates="settings.contact_coordinates.split(',').map(item => Number(item))"></YandexMarker>
    </YandexMap>
  </client-only>
</template>

<script setup lang="ts">
import { YandexMap, YandexMarker } from 'vue-yandex-maps'
import { useSiteConfig } from "~/store/siteConfig";

const options = {
  apiKey: '', // Индивидуальный ключ API
  lang: 'ru_RU', // Используемый язык
  coordorder: 'latlong', // Порядок задания географических координат
  debug: false, // Режим отладки
  version: '2.1' // Версия Я.Карт
}
const markerIcon = {
  iconLayout: 'default#image',
  iconImageHref: '/img/map.svg',
  iconImageSize: [64, 64],
  iconImageOffset: [-32, -64],
  content: '123 v12',
  contentOffset: [0, 15],
  contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-family: $fontFamilyBold;">$[properties.iconContent]</div>'
}
const settings = useSiteConfig().settings

</script>
