export const newApiDomain = 'api-new.ru'
export const byApiDomain = 'api-used.ru'

export type Site = {
    id: number | null,
    domain: string,
    title: string,
    link: string,
    root: boolean
}
export const domains = [
    {
        id: 2,
        title: 'ATLAS-DEALER',
        domain: 'xn----7sbabk4czaugg.xn--p1ai',
        link: 'https://xn----7sbabk4czaugg.xn--p1ai',
        root: false
    }
]

export function currentSite(host: string) {
    return domains.find(value => value.domain === host) || domains[0]
}