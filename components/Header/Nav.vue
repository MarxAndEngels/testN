<template>
  <div class="wrapper__nav">
    <div class="nav__clone" :class="{'active':isOpen}"></div>
    <div class="nav" :class="{'nav--open':isOpen}">
      <nuxt-link class="nav__item"
                 :title="item.name"
                 v-for="(item, index) in nav"
                 :key="index"
                 @click.native="$emit('click')"
                 :to="`/${item.slug}`">
        {{ item.name }}
      </nuxt-link>
      <div class="nav__info">
        <Phone number class="nav__info-item--phone"/>
        <div class="nav__info-item" v-if="settings.contact_schedule">
          {{ settings.contact_schedule }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {useModals} from "~/store/modals";
import {clearPhone} from "~/helpers/filters";

const settings = useSiteConfig().settings;
const emit = defineEmits(["click"]);
const props = defineProps<{
  isOpen: boolean;
}>();
const nav = [
  {
    name: 'Каталог',
    slug: 'new'
  },
  {
    name: 'Заявка на автокредит',
    slug: 'credit-n'
  },
  {
    name: 'Trade-in',
    slug: 'exchange-n'
  },
  {
    name: 'О компании',
    slug: 'about'
  },
  {
    name: 'Контакты',
    slug: 'contacts'
  }
];


let isNight = computed(() => useSiteConfig().isNight)

const phoneClick = () => {
  emit('click')
  useModals().openModal({
    open: true,
    title: 'заявка на обратный звонок',
    type: 'express'
  })
}
</script>
