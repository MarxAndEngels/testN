<template>
    <div class="wrapper__preview-picture">
      <BenefitsCredit/>
          <Picture custom-class="preview-picture__image" :img="image" />
    </div>
</template>
<script setup lang="ts">
import FormSteps from '~/components/Form/Steps.vue'
import BenefitsCredit from "~/components/Benefits/Credit.vue";
const props = defineProps<{
  image: string;
}>();
</script>
