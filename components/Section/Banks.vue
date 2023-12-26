<template>
  <div class="section section--banks">
    <div class="container">
      <h2 class="heading heading--h2">
        Банки-партнеры
      </h2>
      <div class="slider__banks f-carousel" id="slider-banks">
        <div class="f-carousel__viewport">
          <div class="f-carousel__track">
            <div class="bank f-carousel__slide" v-for="bank in banks">
              <img :src="bank.image" :alt="bank.title" class="bank__img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBanks} from "~/store/banks";
import {onMounted} from "vue";
import {Carousel} from "@fancyapps/ui";
import banksQueryString, {BanksTypeData} from "~/apollo/queries/graphqlStrings/banksQueryString";
import {byApiDomain} from "~/app/variables";

const {banksQuery} = banksQueryString;
type Query = {
  query: string,
  variables: object,
}
type Response<T> = {
  data: T
};

const queries: Readonly<[Query]> = [
  {
    query: banksQuery,
    variables: {
      site_id: 172
    }
  }
]
const banks = useBanks().banks
type QueryResults = Readonly<[Response<BanksTypeData>]>;
if (!useBanks().banks.length) {
  const [{data: {banks}}]: QueryResults = await Promise.all(queries.map(async ({query, variables}) => {
    return await $fetch(`https://${byApiDomain}/graphql`, {
      method: "POST",
      body: {
        query,
        variables
      }
    });
  })) as unknown as QueryResults;
  banks.map(bank => {
    bank.image = bank.image.replace('api.genzes.ru', byApiDomain);
    return bank;
  })
  useBanks().setBanks(banks)
}
onMounted(() => {
  const container = document.getElementById("slider-banks");
  const options = {
    infinite: true,
    center: true,
    margin: 32,
    Dots: false,
    transition: "slide",
    Navigation: {
      nextTpl: "",
      prevTpl: "",
    },
  };
  const fc = new Carousel(container, options);
});

</script>