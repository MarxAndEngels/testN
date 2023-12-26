import {useSiteConfig} from "~/store/siteConfig";

export const yandexMetrika = (route, counter_ym) => {
    if (!counter_ym) {
        return false
    }
    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(counter_ym, "init", {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: "dataLayer"
    });
    sendUrlYandexMetrika(route, counter_ym)
}
export const sendUrlYandexMetrika = (route, counter_ym) => {
    // console.log(`https://auto-otzovik.ru${route.fullPath}`)
    ym(counter_ym, 'hit', `${useSiteConfig().site.link}${route.fullPath}`)
}
export const vkAds = (counter_vk) => {
    if (!counter_vk) {
        return false
    }
    _tmr.push({
        id: counter_vk,
        type: "pageView",
        start: (new Date()).getTime(),
        pid: "USER_ID"
    });
    (function (d, w, id) {
        if (d.getElementById(id)) return;
        var ts = d.createElement("script");
        ts.type = "text/javascript";
        ts.async = true;
        ts.id = id;
        ts.src = "https://top-fwz1.mail.ru/js/code.js";
        var f = function () {
            var s = d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(ts, s);
        };
        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    })(document, window, "tmr-code");
}

export const vkAdsReachGoal = (counter_vk, price, id, purchase = false) => {
    if (process.client && counter_vk) {
        let _tmr = window._tmr || (window._tmr = []);
        _tmr.push({
            type: 'reachGoal',
            id: counter_vk,
            value: price,
            goal: purchase ? 'purchase' : 'viewProduct',
            params: {
                product_id: id
            }
        });
    }
}
export const yandexCommercialNew = ({counter_commercial_id, id, mark, folder, price, modification}, thanks = false) => {
    if (process.client && counter_commercial_id) {
        const product = {
            id: id,
            name: `${mark} ${folder}, ${modification} ${price} - ${id}`,
            price: price,
            brand: mark,
            category: `/Новые/${mark}/${folder}/${mark} ${folder}, ${modification}`,
            quantity: 1,
        }
        let ecommerce
        if (thanks) {
            ecommerce = {
                purchase: {
                    actionField: {
                        id: id,
                        goal_id: counter_commercial_id
                    },
                    products: [
                        product
                    ],
                }
            }
        } else {
            ecommerce = {
                detail: {
                    products: [
                        product
                    ],
                },
            }
        }
        dataLayer.push({
            ecommerce
        });
    }
}
export const googleTag = (counter_gtag) => {
    if (!counter_gtag) {
        return false
    }
    useHead({
        script: [{src: `https://www.googletagmanager.com/gtag/js?id=${counter_gtag}`, async: true}]
    })

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', counter_gtag);
}