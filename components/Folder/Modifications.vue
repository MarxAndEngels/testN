<template>
  <div class="folder__modifications">
    <div class="folder__modification" v-for="(modification)  in modifications">
      <div class="folder__modification-title">
        {{ modification.title }}
      </div>
      <div class="folder__complectation"
           :class="{'folder__complectation--active':activeIndex === modification.id + '' + index}"
           :id="`ex-${modification.id + '' + index}`"
           v-for="(complectation, index) in modification.complectations">
        <div class="folder__complectation-head">
          <div class="folder__complectation-head-block">
            <div class="folder__complectation-title">{{ complectation.title }}</div>
            <div class="folder__complectation-prices">
              <div class="folder__complectation-price folder__complectation-price--actual">
                {{ numberFormat(complectation.price + dopPrice) }} ₽
              </div>
              <div class="folder__complectation-price folder__complectation-price--old" v-if="folder.availability">
                {{ numberFormat(complectation.price_old) }} ₽
              </div>
              <div class="folder__complectation-price" v-else>
                Последняя цена
              </div>
            </div>
          </div>
          <div class="folder__complectation-buttons" v-if="folder.availability">
            <button class="button button--short button--active" @click="onCredit(modification, complectation)">
              Купить в кредит
            </button>
            <button class="button button--short button--info" @click="complectationMore(modification.id + ''+ index)">
              <span v-if="activeIndex === modification.id + '' + index">Скрыть</span>
              <span v-else>Подробнее</span>
            </button>
          </div>
          <div class="folder__complectation-buttons" v-else>
            <div class="button button--short button--info">
              Нет в наличии
            </div>
            <button class="button button--short button--info" @click="complectationMore(modification.id + ''+ index)">
              <span v-if="activeIndex === modification.id + '' + index">Скрыть</span>
              <span v-else>Подробнее</span>
            </button>
          </div>
        </div>
        <div class="folder__complectation-equipment">
          <div class="folder__complectation-equipment-title">
            Комплектация
            <br/>
            <span>{{ complectation.title }}</span>
          </div>
          <div class="folder__complectation-equipment-list">
            <div class="folder__complectation-equipment-block" v-for="item in complectation.equipment">
              <div class="folder__complectation-equipment-item folder__complectation-equipment-title">
                {{ item.title }}
              </div>
              <div class="folder__complectation-equipment-item folder__complectation-equipment-value"
                   v-for="value in item.values">
                {{ value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ComplectationType, FolderPageType, ModificationType} from "~/apollo/queries/new/folder";
import {creditPrice, numberFormat} from "~/helpers/filters";
import {useModals} from "~/store/modals";

const activeIndex = ref<string | ''>('')
const props = defineProps<{
  folder: FolderPageType,
  modifications: ModificationType[],
  dopPrice: number,
  color: number
}>();
const complectationMore = (slug: string) => {
  let el = document.getElementById(`ex-${slug}`)
  activeIndex.value === slug ? activeIndex.value = '' : activeIndex.value = slug
  if (el) {
    window.scrollTo({top: el.offsetTop + -56});
  }
}
const onCallback = () => {
  useModals().openModal({
    open: true,
    title: 'Заказать обратный звонок',
    type: 'express'
  })
};
const onCredit = (modification: ModificationType, complectation: ComplectationType) => {
  useModals().setModalOffer({
    id: props.folder.id,
    mark: props.folder.mark.title,
    markSlug: props.folder.mark.slug,
    folder: props.folder.title,
    folderSlug: props.folder.slug,
    modification: complectation.title,
    title: `${props.folder.mark.title} ${props.folder.title} ${complectation.title}`,
    image: props.folder.colors[props.color].image.medium_webp,
    price: complectation.price + props.dopPrice,
    tech: [
      {
        name: "Привод",
        value: `${modification.drive_type.title}`,
      },
      {
        name: "Коробка",
        value: `${modification.gearbox.title}`,
      },
      {
        name: "Тип двигателя",
        value: `${modification.engine_type.title}`,
      },
      {
        name: "Кузов",
        value: `${props.folder.bodyType.title}`,
      },
      {
        name: "Мощность",
        value: `${props.folder.engine_power
            ? props.folder.engine_power + " л.с."
            : props.folder.engine_power_kvt + " кВт"
        }`,
      },
      {
        name: "Объем",
        value: `${modification.engine_volume} л.`,
      },
    ],
    type: 'folder',

    modificationId: modification.id,
    complectationId: complectation.id,
    folderId: props.folder.id,
    markId: props.folder.mark.id,
    colorId: props.folder.colors[props.color].id
  });
  useModals().openModal({
    open: true,
    title: "заявка на автокредит",
    type: "credit-new",
  });
};

</script>
