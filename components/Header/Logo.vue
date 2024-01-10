<template>
  <div>
    <!--    <nuxt-link class="header__official" v-if="currentComponent.slug"-->
    <!--               :to="`/${catalogRoute}/${currentComponent.slug}`"-->
    <!--               @click.native="$emit('click')">-->
    <!--&lt;!&ndash;      Официальный дилер {{ currentComponent.name }}&ndash;&gt;-->
    <!--&lt;!&ndash;      <svg-icon :name="`emblems/${currentComponent.slug}-logo`"/>&ndash;&gt;-->
    <!--    </nuxt-link>-->
    <nuxt-link to="/"
               class="header__logo">
           <img v-if="isMobile" src="/img/logo.svg" alt="logo">
            <img v-else src="/img/logo-desktop.svg" alt="logo">
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
const { isMobile } = useDevice();
</script>

