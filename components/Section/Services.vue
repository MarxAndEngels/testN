<template>
  <div class="section">
    <div class="container">
      <h2 class="heading heading--h2">услуги</h2>
      <div class="services">
        <nuxt-link
          :to="service.slug"
          class="service"
          v-for="(service, index) in services"
          :key="index"
        >
          <div class="services__wrap">
            <Picture custom-class="service__image" :img="service.image" />
            <span class="service__content">
              <span class="service__title">
                {{ service.title }}
              </span>
              <span class="service__arrow">
                <span class="service__arrow-line"></span>
                <nuxt-icon name="arrow-right" />
              </span>
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Picture from "~/components/Picture";

const services = [
  {
    title: "автокредит",
    slug: "/credit-n",
    image: "/img/services/credit",
  },
  {
    title: "trade-in",
    slug: "/exchange-n",
    image: "/img/services/trade-in",
  },
];
</script>