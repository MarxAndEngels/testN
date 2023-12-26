<template>
  <div class="catalog__folders-line">
    <CardFolder
        :folder="folder"
        v-for="folder in folders"/>
  </div>
</template>

<script setup lang="ts">
import CardFolder from "~/components/MiniCards/Folder.vue";
import {requestCatalogFolders} from "~/helpers/request";
import {ref} from "#imports";
import {FoldersInput, FolderType} from "~/apollo/queries/new/folders";
import {watch} from 'vue';
import {useRoute} from 'vue-router';

const folders = ref<FolderType[]>()
const route = useRoute()

let loading = ref<boolean>(true)

let variables = ref<FoldersInput>(
    {
      page: 1,
      limit: 10,
      popular: true
    }
)
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
</script>