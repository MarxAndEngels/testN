import {DocumentNode} from "graphql/language";

export const siteConfigGql: DocumentNode = gql`
    query seoTag(
        $site_id:Int
    ){
        seoTag(
            site_id:$site_id
        ) {
            slug
            h1
            title
            description
            crumbs{
                link
                title
            }
        }
        siteSettings(
            site_id: 2) {
            id
            settings{
                key
                value
            }
        }
        catalog(site_id: $site_id) {
            id
            title
            title_cyrillic
            slug
            priority
            warranty_year
            warranty_km
            offers_count
            folders {
                id
                title
                title_cyrillic
                offers_count
                slug
            }
        }
        sets(site_id: $site_id) {
            title
            slug
        }
    }`


export type SiteConfigType = {
    seoTag: SeoTagType[]
    siteSettings: SiteSettingType
    catalog: CatalogType[]
    sets: SetType[]
}


export type SetType = {
    title: string
    slug: string
}


export type CatalogType = {
    id: number
    title: string
    slug: string
    priority: boolean
    offers_count: number
    title_cyrillic?: string
    warranty_year?: number
    warranty_km?: number
    folders: FolderType[]
}
export type FolderType = {
    id: number
    title: string
    title_cyrillic?: string
    offers_count: number
    slug: string

}


export type SiteSettingType = {
    id: number
    settings: {
        key: string
        value: string
    }[]
    __typename: string
}

export type CrumbsType = {
    link: string
    title: string
}
export type SeoTagType = {
    slug?: string
    h1: string
    title: string
    description: string
    crumbs?: CrumbsType[]
}
