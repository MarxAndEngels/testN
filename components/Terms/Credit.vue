<template>
  <div class="terms">
    <h2 class="heading heading--h2">Условия автокредита</h2>
    <ul class="terms__list">
      <li class="terms__item"
          v-for="(item, index) in terms"
          :key="index">
        <div class="terms__item-label">{{ item.title }}</div>
        <div class="terms__item-content"
             v-if="settings[item.slug]">
          {{ settings[item.slug] }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import {useSiteConfig} from "~/store/siteConfig";

const settings = useSiteConfig().settings

const terms = [
  {
    title: "Ставка",
    slug: "credit_percent"
  },
  {
    title: "Первый взнос",
    slug: "first_installment"
  },
  {
    title: "Сумма",
    slug: "credit_sum"
  },
  {
    title: "Срок",
    slug: "credit_period"
  },
  {
    title: "Скидка за кредит",
    slug: "sale_credit"
  },
  {
    title: "Оформление",
    slug: "credit_registration"
  },
  {
    title: "Одобрение",
    slug: "credit_approve"
  },
  {
    title: "Погашение",
    slug: "credit_repayment"
  }
]
</script>
