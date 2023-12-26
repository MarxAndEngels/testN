<template>
  <Header />
  <div class="error__page wrapper">
    <div class="container">
      <h1 class="error__page-title">404</h1>
      <div class="error__img-wrap">
        <picture>
          <source
            type="image/webp"
            media="(min-width: 768px)"
            data-srcset="/img/404@1x.webp 1x, /img/404@2x.webp 2x"
          />
          <source
            media="(min-width: 768px)"
            data-srcset="/img/404@1x.jpg 1x, /img/404@2x.jpg 2x"
          />

          <source
            type="image/webp"
            data-srcset="/img/404@1x.webp 1x, /img/404@2x.webp 2x"
          />
          <img
            loading="lazy"
            class="lazyload error__img"
            data-srcset="/img/404@1x.jpg 1x, /img/404@2x.jpg 2x"
            alt=""
            data-src="/img/404@1x.jpg"
          />
        </picture>
      </div>
      <div class="error__page-subtitle">Страница не найдена</div>
      <nuxt-link to="/" class="button button--primary">на главную</nuxt-link>
    </div>
  </div>
  <Footer />
</template>
<script lang="ts" setup>
import Header from "~/components/Header";
</script>