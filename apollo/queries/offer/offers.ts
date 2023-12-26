import {DocumentNode} from "graphql/language";

export const offersGql: DocumentNode = gql`
    query offers(
        $site_id: Int!
        $page: Int
        $limit: Int
        $category: String
        $mark_slug_array: [String]
        $folder_slug_array: [String]
        $external_id_array: [Int]
        $sort: String
        $except_external_id: Int
        $generation_slug_array: [String]
        $engine_type_id_array: [Int]
        $body_type_id_array: [Int]
        $gearbox_id_array: [Int]
        $drive_type_id_array: [Int]
        $owner_id_array:[Int]
        $year_from: Int
        $year_to: Int
        $price_from: Int
        $price_to: Int
        $set: String
        $url: String
        $dateFormat: String
    ){
        offers(
            site_id: $site_id,
            except_external_id:$except_external_id,
            mark_slug_array: $mark_slug_array,
            folder_slug_array: $folder_slug_array,
            external_id_array: $external_id_array,
            generation_slug_array: $generation_slug_array,
            engine_type_id_array: $engine_type_id_array,
            body_type_id_array: $body_type_id_array,
            gearbox_id_array: $gearbox_id_array,
            drive_type_id_array: $drive_type_id_array,
            owner_id_array: $owner_id_array,
            year_from: $year_from,
            year_to: $year_to,
            price_from: $price_from,
            price_to: $price_to,
            category: $category,
            page: $page,
            limit: $limit,
            sort: $sort,
            set: $set,
            url:$url
        ) {
            data {
                id
                external_id
                external_unique_id
                name
                category_enum
                price
                price_old
                run
                vin
                color {
                    id
                    title
                    name
                }
                year
                createdAt(format: $dateFormat, sub_day:true)
                engine_power
                engine_volume
                mark {
                    id
                    slug
                    title
                }
                folder {
                    id
                    slug
                    title
                }
                images {
                    tiny_webp
                    small_webp
                    medium_webp
                    original
                }
                owner {
                    id
                    title
                    number
                }
                driveType {
                    id
                    title
                    name
                }
                bodyType {
                    id
                    title
                    name
                }
                gearbox {
                    id
                    title
                    title_short_rus
                    name
                }
                engineType {
                    id
                    title
                    name
                }
                generation {
                    id
                    slug
                    name
                }
            }
            last_page
            current_page
            total
            has_more_pages
        }
    }`
export type OffersInputType = {
    page?: number | null
    limit?: number
    category?: string
    mark_slug_array?: string[] | null
    folder_slug_array?: string[] | null
    external_id_array?: number[]
    sort?: any
    except_external_id?: number
    generation_slug_array?: string[]
    engine_type_id_array?: number[]
    body_type_id_array?: number[]
    gearbox_id_array?: number[]
    drive_type_id_array?: number[]
    owner_id_array?: number[]
    year_from?: number
    year_to?: number
    price_from?: number
    price_to?: number
    set?: string | null
    url?: string
    dateFormat?: string
}
export type OffersTypeData = {
    offers: {
        data: OfferType[]
        last_page: number
        current_page: number
        total: number
        has_more_pages: boolean
    }

}
export type OfferType = {
    id: number
    external_id: number
    external_unique_id: number
    name: string
    category_enum: string
    price: number
    price_old: number
    run: number
    vin: string
    year: number
    createdAt: string
    engine_power: number
    engine_volume: number
    color: {
        id: number
        title: string
        name: string
    }
    images: {
        small_webp: string
        medium_webp: string
        original: string
        tiny_webp: string
    }[]
    mark: {
        id: number
        slug: string
        title: string
    }
    folder: {
        id: number
        slug: string
        title: string
    }
    generation: {
        id: number
        slug: string
        name: string
    }
    owner: {
        id: number
        title: string
        number: number
    }
    driveType: {
        id: number
        title: string
        name: number
    }
    bodyType: {
        id: number
        title: string
        name: number
    }
    engineType: {
        id: number
        title: string
        name: number
    }
    gearbox: {
        id: number
        title: string
        title_short_rus: string
        name: string
    }
}
