<template>
  <div class="folder__colors">
    <div class="folder__colors-item"
         :class="{'folder__colors-item--active':props.activeColor?.id === color.id}"
         @click="emit('changeColor', index)"
         :style="{backgroundColor: color.hex_code}"
         v-for="(color, index) in colors"></div>
  </div>
</template>

<script setup lang="ts">
import {FolderColorType} from "~/apollo/queries/new/folder";

const emit = defineEmits(["changeColor"]);
const props = defineProps<{
  colors: FolderColorType[];
  activeColor: FolderColorType
}>();
</script>