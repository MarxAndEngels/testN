import {CrumbType} from "~/app/types/crumbs";

export type SeoTagType = {
    slug?: string
    h1: string
    title: string
    description: string
    crumbs?: CrumbType[]
}
