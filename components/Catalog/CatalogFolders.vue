<template>
  <div class="catalog__folders" id="catalog">
    <div class="catalog__folders-line" v-if="folders">
      <CardFolder :key="folder.id" v-for="folder in folders" :folder="folder"/>
    </div>
    <div class="skeletons" v-else>
      <SkeletonFolder/>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardFolder from "~/components/MiniCards/Folder.vue";
import SkeletonFolder from "~/components/Skeleton/Folder.vue";
import CatalogControlsNew from '~/components/Catalog/ControlsNew.vue'
import {requestCatalogFolders} from "~/helpers/request";
import {computed, ref} from "#imports";
import {FoldersInput, FolderType} from "~/apollo/queries/new/folders";
import {watch} from 'vue';
import {useRoute} from 'vue-router';

const folders = ref<FolderType[]>()
const route = useRoute()

let loading = ref<boolean>(true)

let variables = computed<FoldersInput>(() => {
  return {
    page: 1,
    limit: 30,
    mark_slug: route.params.mark,
    sort: route.query.sort || null,
  }
})
const request = async () => {
  loading.value = true
  const {pending, data} = await requestCatalogFolders(variables.value)
  folders.value = data.value?.folders.data
  loading.value = pending.value
}

const {pending, data} = await requestCatalogFolders(variables.value)
folders.value = data.value?.folders.data
loading.value = pending.value


watch(data, () => {
  folders.value = data.value?.folders.data
  loading.value = false
})


watch(route, async () => {
  await request()
})


</script>