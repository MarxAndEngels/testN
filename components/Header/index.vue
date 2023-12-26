<template>
  <div class="header">
    <div class="header__contacts upper">
      <div class="container">
        <div class="header__contacts-line">
          <div class="header__contacts-text">
            Новые автомобили
          </div>
          <HeaderContacts/>
        </div>
      </div>
    </div>
    <div class="header__top">
      <div class="container">
        <div class="header__inner">
          <HeaderLogo/>
          <HeaderNav :is-open="isOpen" @click="clickMenu"/>
          <Phone icon v-if="isMobile" class="header__inner-mobile-phone"/>
          <HeaderMarks :is-open="isOpenMarks" @click="clickMarks"/>
          <div class="burger" @click="clickMenu"
               :class="{'burger--open':isOpen}">
            <div class="burger__line"></div>
            <div class="burger__line"></div>
            <div class="burger__line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Phone from "~/components/Phone";
import HeaderNav from "~/components/Header/Nav.vue";
import HeaderLogo from "~/components/Header/Logo.vue";
import HeaderContacts from "~/components/Header/Contacts.vue";
import HeaderMarks from "~/components/Header/Marks.vue";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {watch} from "vue";
import {useModals} from "~/store/modals";
import {useSiteConfig} from "~/store/siteConfig";
import {clearPhone} from "~/helpers/filters";

const modal = useModals()
const {isMobile} = useDevice();
const route = useRoute();
const settings = useSiteConfig().settings;
const isOpen = ref<boolean>(false)
const isOpenMarks = ref<boolean>(false)
const clickMenu = () => {
  isOpenMarks.value = false;
  isOpen.value = !isOpen.value;
  modal.closeModal()
};
const clickMarks = () => {
  isOpen.value = false;
  isOpenMarks.value = !isOpenMarks.value;
  modal.closeModal()
};
watch(route, async () => {
  await useModals().closeModal()
});

const dateTimeFunc = async () => {
  if (new Date().getHours() >= 21 || new Date().getHours() <= 8) {
    await useSiteConfig().setIsNight(true)
  } else {
    await useSiteConfig().setIsNight(false)
  }
}

onMounted(() => {
  dateTimeFunc()
  setInterval(() => {
    dateTimeFunc()
  }, 120000)
});
</script>