import {defineNuxtPlugin} from '#app';
import lazySizes from "lazysizes";

export default defineNuxtPlugin(nuxtApp => {
    lazySizes.init()
})
