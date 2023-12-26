<template>
  <div class="header__contacts-info">
    <Phone number class="header__contacts-phone"/>
    <div class="header__contacts_address">
      {{ settings.contact_address }}
    </div>
  </div>
</template>
<script setup lang="ts">
import Phone from "~/components/Phone";
import {useSiteConfig} from "~/store/siteConfig";

const settings = useSiteConfig().settings;

</script>
