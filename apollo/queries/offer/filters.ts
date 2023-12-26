import {DocumentNode} from "graphql/language";

export const filterGql: DocumentNode = gql`
    query offerFilters(
        $site_id: Int
        $mark_slug_array: [String]
        $folder_slug_array: [String]
        $gearbox_id_array: [Int]
        $drive_type_id_array: [Int]
        $engine_type_id_array: [Int]
        $price_from: Int
        $price_to: Int
    ){
        offerFilters(
            site_id: $site_id,
            mark_slug_array: $mark_slug_array,
            folder_slug_array: $folder_slug_array,
            gearbox_id_array: $gearbox_id_array,
            drive_type_id_array: $drive_type_id_array,
            engine_type_id_array: $engine_type_id_array,
            price_from: $price_from,
            price_to: $price_to
        )
        {
            engineType {
                title
                id
                slug
            }
            driveType {
                title
                id
                slug
            }
            gearbox {
                title
                title_short
                title_short_rus
                id
                slug
            }
            bodyType {
                title
                id
                slug
            }
            year
            run
            price
        }
    }`
export type OfferFiltersInputType = {
    mark_slug_array?: string[]
    folder_slug_array?: string[]
    gearbox_id_array?: number[]
    drive_type_id_array?: number[]
    engine_type_id_array?: number[]
    price_from?: number
    price_to?: number
}
export type OfferFiltersDataType = {
    offerFilters: OfferFiltersType
}
export type OfferFiltersType = {
    engineType: {
        title: string
        id: number
        slug: string
    }[]
    driveType: {
        title: string
        id: number
        slug: string
    }[]
    gearbox: {
        title: string
        title_short: string
        title_short_rus: string
        id: number
        slug: string
    }
    bodyType: {
        title: string
        id: number
        slug: string
    }
    year: number[]
    run: number[]
    price: number[]
}
