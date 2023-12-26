import {DocumentNode} from "graphql/language";

export const newOffersGql: DocumentNode = gql`query offers(
    $site_id: Int!,
    $folder_slug:String,
    $set:String,
    $mark_slug:String,
    $body_type:String,
    $gearbox:GearboxEnumType,
    $engine_type:EngineTypeEnumType,
    $drive_type:DriveTypeEnumType,
    $sort: String,
    $price_from: Int,
    $price_to: Int,
    $page:Int,
    $limit:Int
) {
    offers(
        site_id: $site_id,
        mark_slug:$mark_slug,
        sort:$sort,
        set:$set,
        page: $page,
        limit: $limit,
        folder_slug:$folder_slug
        body_type:$body_type
        gearbox:$gearbox
        engine_type:$engine_type
        drive_type:$drive_type
        price_from: $price_from,
        price_to: $price_to,
    )
    {
        data{
            id
            name
            price
            price_old
            type{
                name
                title
            }
            mark{
                id
                title
                slug
            }
            folder{
                id
                title
                slug
                bodyType{
                    id
                    title
                }
            }
            color{
                title
                hex_code
            }
            modification{
                id
                title
                engine_volume
                engine_power
                engine_power_kvt
                gearbox{
                    name
                    title
                }
                drive_type{
                    name
                    title
                }
                engine_type{
                    name
                    title
                }
            }
            complectation{
                id
                title
            }
            images{
                tiny
                small_webp
                medium_webp
            }

        }
        total
        last_page
        current_page
        has_more_pages
    }
}`

export type NewOffersInputType = {
    page?: number | null
    limit?: number
    mark_slug: string
    folder_slug: string
    gearbox?: string
    engine_type?: string
    drive_type?: string
    body_type: string
    set?: string
    sort?: any
}

export type NewOffersDataType = {
    offers: {
        data: NewOfferType[]
        total: number
        current_page: number
        last_page: number
        has_more_pages: boolean
    }

}

export type NewOfferType = {
    id: number
    name: string
    price: number
    price_old: number
    type: {
        name: string
        title: string
    }
    mark: {
        id: number
        title: string
        slug: string
    }
    folder: {
        id: number
        title: string
        slug: string
        bodyType: {
            id: number,
            title: string
        }
    }
    color?: {
        title: string
        hex_code: string
    }
    modification: {
        id: number
        title: string
        engine_volume: number
        engine_power: number | null
        engine_power_kvt: number | null
        gearbox: {
            name: string
            title: string
        }
        drive_type: {
            name: string
            title: string
        }
        engine_type: {
            name: string
            title: string
        }
    }
    complectation: {
        id: number
        title: string
    }
    images: {
        tiny: string
        small_webp: string
        medium_webp: string
    }[]
}




