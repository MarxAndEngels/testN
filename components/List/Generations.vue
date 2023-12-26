<template>
  <div class="folders">
<!--    <nuxt-link-->
<!--        class="folders__item"-->
<!--        :class="{'folders__item&#45;&#45;active':generation.slug === route.query.generation}"-->
<!--        :title="generation.name"-->
<!--        :to="`/used/${route.params.mark}/${route.params.folder}/?generation=${generation.slug}`"-->
<!--        v-for="generation in generations"-->
<!--        :key="generation.id">-->
<!--      <div class="folders__item-title">{{ generation.name }}</div>-->
<!--      <div class="folders__item-count">{{ generation.offers_count }} авто</div>-->
<!--    </nuxt-link>-->
  </div>
</template>

<script setup lang="ts">
// const route = useRoute()
// const marks = useMarks().marks
// const folders = marks.find(item => item.slug === route.params.mark)?.folders || []
// const generations = folders?.find(item => item.slug === route.params.folder)?.generations || []
</script>