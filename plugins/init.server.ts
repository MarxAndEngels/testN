import {defineNuxtPlugin} from '#app';
import {currentSite} from "~/app/variables";
import {useSiteConfig} from "~/store/siteConfig";

export default defineNuxtPlugin(async ({ssrContext}) => {
    const host = ssrContext?.event.node.req.headers.host
    const siteConfig = useSiteConfig()
    await siteConfig.setSite(currentSite(host || 'localhost'))
    await siteConfig.getSiteConfig()
});