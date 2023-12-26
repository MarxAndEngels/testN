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
      <img src="/img/logo-official.svg"
           alt="logo">
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">

</script>

