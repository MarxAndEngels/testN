<template>
  <div class="folder__render">
    <PictureServer lazy :onex="activeColor.image.medium"
                   :twox="activeColor.image.large"
                   :twox-webp="activeColor.image.large_webp"
                   :onex-webp="activeColor.image.medium_webp"
                   :original="activeColor.image.original"
                   :alt="`Новый ` + alt + ` цвет ` + activeColor.title.toLowerCase()"/>
  </div>
</template>
<script setup lang="ts">
import {FolderColorType} from "~/apollo/queries/new/folder";

const emit = defineEmits(["changeColor"]);
const props = defineProps<{
  activeColor: FolderColorType
  alt: string
}>();
</script>