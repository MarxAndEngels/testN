<template>
  <div class="header__marks">
    <nuxt-icon @click="emit('click')" :class="{'header__marks-icon--active':isOpen}" class="header__marks-icon"
               name="icon-makes"/>
    <div @click="emit('click')" class="header__marks-overflow" :class="{'header__marks-overflow--active':isOpen}"></div>
    <div class="header__marks-modal"
         :class="{'header__marks-modal--open':isOpen}">
      <div class="header__marks-content">
        <ListMarks @click="emit('click')" :modal="true"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListMarks from '~/components/List/Marks.vue'

const emit = defineEmits(["click"]);
const props = defineProps<{
  isOpen: boolean;
}>();
</script>
