<template>
  <section class="grid folder" v-if="folder">
    <div class="grid__left">
      <FolderRender :alt="`${folder.mark.title} ${folder.title}`" :active-color="folder.colors[currentColor]"/>
      <FolderColors @change-color="changeColor" :active-color="folder.colors[currentColor]" :colors="folder.colors"/>
      <Tech v-if="isMobile" :tech="currentTech"/>
      <BuyOptions @on-credit="onCredit" :active="folder.availability" @on-exchange="onExchange" v-if="isMobile"
                  :price="currentPrice"
                  :price-old="chosenComplectation.price_old" type="folder"/>
      <FolderBonuses v-if="isMobile && folder.availability" @change-bonuses="changeBonuses" :difference="difference"/>
      <BenefitsCredit/>
      <FolderModifications :folder="folder" :color="currentColor" :modifications="folder.modifications"
                           :dop-price="dopSum"/>
    </div>
    <div class="grid__right" v-if="isDesktop">
      <Tech view="inline" :tech="currentTech"/>
      <div class="grid__sticky">
        <FolderBonuses v-if="folder.availability" @change-bonuses="changeBonuses" :difference="difference"/>
        <BuyOptions :active="folder.availability" @on-credit="onCredit" @on-exchange="onExchange" :price="currentPrice"
                    :price-old="chosenComplectation.price_old"
                    type="folder"/>
      </div>
    </div>
  </section>
  <SkeletonFolderPage v-else/>
</template>

<script setup lang="ts">
import {ref} from "#imports";
import {FolderPageInput, FolderPageType} from "~/apollo/queries/new/folder";
import {requestCatalogFolder} from "~/helpers/request";
import SkeletonFolderPage from '~/components/Skeleton/FolderPage.vue'
import FolderRender from "~/components/Folder/Render.vue";
import BenefitsCredit from "~/components/Benefits/Credit.vue";
import FolderColors from "~/components/Folder/Colors.vue";
import Tech from "~/components/Tech";
import BuyOptions from "~/components/BuyOptions";
import FolderBonuses from "~/components/Folder/Bonuses.vue";
import FolderModifications from "~/components/Folder/Modifications.vue";

import {allComplectations} from "~/helpers/filters";
import {computed} from "@vue/reactivity";
import {useSiteConfig} from "~/store/siteConfig";
import {useRoute} from "vue-router";
import {FileOperationPatternKind} from "vscode-languageserver-protocol";
import folder = FileOperationPatternKind.folder;
import {ModalOfferType, useModals} from "~/store/modals";

const {isMobile, isDesktop} = useDevice();
const route = useRoute();
const folder = ref<FolderPageType>();
const complectations = computed(() => {
  return allComplectations(folder.value?.modifications)
})
const currentTech = computed(() => {
  return {
    engine_volume: chosenComplectation.value?.modification?.engine_volume,
    engine_power: chosenComplectation.value?.modification?.engine_power,
    time: folder.value?.time,
    max_speed: folder.value?.max_speed,
  }
})
const currentComplectation = ref()
const chosenComplectation = computed(() => {
  return currentComplectation.value || complectation.value
})
const difference = computed(() => {
  return Math.round((chosenComplectation.value.price_old - chosenComplectation.value.price) / 1000) * 1000;
})
const dopSum = ref<number>(0)
const complectation = computed({
  get: () => {
    return complectations.value[0]
  },
  set: (value) => {
    currentComplectation.value = value
  }
})
const currentPrice = computed(() => {
  return chosenComplectation.value.price + dopSum.value
})

let currentColor = ref<number>(0);


const variables: FolderPageInput = {
  mark_slug: <string>route.params.mark,
  slug: <string>route.params.folder,
};


const handlerSelect = async (data: any) => {
  complectation.value = data.option
}
const changeBonuses = async (sum: number) => {
  dopSum.value = sum
}
const changeColor = async (index: number) => {
  currentColor.value = index;
};


const {pending, data, error} = await requestCatalogFolder(variables);
folder.value = data.value?.folder;
// if (!data.value?.folder) createError({statusCode: 404, statusMessage: 'Page Not Found'})
if (route.query.color) {
  folder.value?.colors.map((item, index) => {
    if (item.slug === route.query.color) {
      currentColor.value = index
    }
  })
}

watch(data, () => {
  folder.value = data.value?.folder;
});

let modalOffer = computed<ModalOfferType>(() => {
  return {
    id: folder.value?.id,
    mark: folder.value?.mark.title,
    markSlug: folder.value?.mark.slug,
    folder: folder.value?.title,
    folderSlug: folder.value?.slug,
    modification: chosenComplectation.value.title,
    title: `${folder.value?.mark.title} ${folder.value?.title} ${chosenComplectation.value.title}`,
    image: folder.value?.colors[currentColor.value].image.medium_webp,
    price: currentPrice.value,
    tech: [
      {
        name: "Привод",
        value: `${chosenComplectation.value.modification.drive_type.title}`,
      },
      {
        name: "Коробка",
        value: `${chosenComplectation.value.modification.gearbox.title}`,
      },
      {
        name: "Тип двигателя",
        value: `${chosenComplectation.value.modification.engine_type.title}`,
      },
      {
        name: "Кузов",
        value: `${folder.value?.bodyType.title}`,
      },
      {
        name: "Мощность",

        value: `${chosenComplectation.value.modification.engine_power ?
            chosenComplectation.value.modification.engine_power + ' л.с.' :
            chosenComplectation.value.modification.engine_power_kvt + ' кВт'}`,
      },
      {
        name: "Объем",
        value: `${chosenComplectation.value.modification.engine_volume} л.`,
      },
    ],
    type: 'folder',
    modificationId: chosenComplectation.value.modification.id,
    complectationId: chosenComplectation.value.id,
    folderId: folder.value?.id,
    markId: folder.value?.mark.id,
    colorId: folder.value?.colors[currentColor.value].id
  }
})
const onCredit = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на автокредит',
    type: 'credit-new'
  })
};
const onExchange = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на trade-in',
    type: 'exchange-new'
  })
};

if (route.query.color) {
  folder.value?.colors.map((item, index) => {
    if (item.id === Number(route.query.color)) {
      currentColor.value = index
    }
  })
}
if (route.query.config) {
  let complectationId = Number(route.query.config.toString().split('-')[1])
  let modificationId = Number(route.query.config.toString().split('-')[0])
  currentComplectation.value = complectations.value.find(item => item.id === complectationId && item.modification.id === modificationId)
}

</script>