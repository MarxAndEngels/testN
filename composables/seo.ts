import Twig from "twig";
import {engineVolume, numberFormat} from "~/helpers/filters";

import {useSiteConfig} from "~/store/siteConfig";
import {SeoTagType} from "~/app/types/seoTags";

Twig.extendFilter("engineVolume", function (value) {
    return engineVolume(value)
});
Twig.extendFilter("numberFormat", function (value) {
    return numberFormat(Number(value))
});


const getSeoTag = (slug: string, params?: any): SeoTagType => {
    const seoTemplate = useSiteConfig().seoTag.find(item => item.slug === slug)
    const seoTitle = Twig.twig({data: seoTemplate?.title})
    const seoH1 = Twig.twig({data: seoTemplate?.h1})
    const seoDescription = Twig.twig({data: seoTemplate?.description})
    const seoCrumbs = seoTemplate?.crumbs?.map(item => {
        let seoCrumbLink = Twig.twig({data: item.link})
        let seoCrumbTitle = Twig.twig({data: item.title})
        return {
            link: seoCrumbLink.render(params),
            title: seoCrumbTitle.render(params)
        }
    })

    return {
        slug: seoTemplate?.slug,
        h1: seoH1?.render(params),
        title: seoTitle?.render(params),
        description: seoDescription?.render(params),
        crumbs: seoCrumbs
    }
}

export const renderSeoTemplate = (slug: string, params?: any, ogImage?: string): SeoTagType => {
    const route = useRoute()
    const seoTags = getSeoTag(slug, params)
    const headMeta = [
        {name: 'description', content: seoTags.description},
        {property: 'og:title', content: seoTags.title},
        {property: 'og:description', content: seoTags.description},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: `${useSiteConfig().site.link}${route.fullPath}`},
        {property: 'og:locale', content: 'ru_RU'}
    ]
    if (!ogImage) {
        ogImage = useSiteConfig().site.link + "/preview.png"
    }
    headMeta.push({
        property: 'og:image', content: ogImage
    })
    if (!useSiteConfig().site.root) {
        headMeta.push({
            name: 'robots', content: 'noindex, nofollow'
        })
    }

    let routePath = slug !== 'index' ? route.path : ''
    useHead({
        title: seoTags.title,
        meta: headMeta,
        link: [
            {
                rel: 'canonical',
                href: `${useSiteConfig().site.link}${routePath}`,
            },
        ]
    })
    // jsonLd(slug, seoTags.crumbs, params, ogImage)
    return seoTags
}
