import {DocumentNode} from "graphql/language";

export const newOfferPageGql: DocumentNode = gql`query offer($site_id: Int!,$folder_slug:String, $mark_slug:String, $id:Int) {
    offer(site_id: $site_id,mark_slug:$mark_slug, folder_slug:$folder_slug, id:$id)
    {
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
            tech_params{
                title
                value
            }
        }
        complectation{
            id
            title
            equipment{
                title
                values
            }
        }
        images{
            tiny
            tiny_webp
            small_webp
            medium_webp
            original
        }
        is_active
    }
}`

export type NewOfferPageInputType = {
    mark_slug: string
    folder_slug: string
    id: number
}

export type NewOfferPageDataType = {
    offer: NewOfferPageType

}

export type OfferComplectationType = {
    id: number
    title: string
    equipment: {
        title: string
        values: string[]
    }[]
}

export type NewOfferPageType = {
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
        tech_params: {
            title: string
            value: string
        }[]
    }
    complectation: OfferComplectationType
    images: {
        original: string
        tiny_webp: string
        tiny: string
        small_webp: string
        medium_webp: string
    }[]
    is_active: boolean
}




