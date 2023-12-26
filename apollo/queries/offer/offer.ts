import {DocumentNode} from "graphql/language";

export const offerGql: DocumentNode = gql`
query offer(
    $site_id: Int!
    $mark_slug:String!
    $folder_slug: String!
    $external_id: Int!
    $dateFormat: String
){
   offer(
    site_id: $site_id,
    mark_slug: $mark_slug,
    folder_slug: $folder_slug,
    external_id: $external_id
   ) 
   { 
    id
    is_active
    external_id
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
    equipment_groups {
        title
        values
    }
    generation {
        id
        slug
        name
    }
  }
}`
export type OfferPageInputType = {
    mark_slug: string
    folder_slug: string
    external_id: number
    dateFormat?: string
}
export type OfferPageDataType = {
    offer: OfferPageType
}
export type OfferPageType = {
    id: number
    is_active: boolean
    external_id: number
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
    equipment_groups: {
        title: string
        values: []
    }[]
    color: {
        id: number
        title: string
        name: string
    }
    images: {
        tiny_webp: string
        small_webp: string
        medium_webp: string
        original: string
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
