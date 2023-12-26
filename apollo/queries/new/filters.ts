import {DocumentNode} from "graphql/language";

export const filterNewGql: DocumentNode = gql`
    query offerFilter(
        $site_id: Int
        $page: Int
        $limit: Int
        $mark_slug: String
        $folder_slug: String
        $sort: String
        $gearbox: GearboxEnumType
        $engine_type: EngineTypeEnumType
        $drive_type: DriveTypeEnumType
        $body_type: String
        $set: String,
        $price_from: Int,
        $price_to: Int
    ){
        offerFilter(
            site_id: $site_id,
            page: $page,
            limit: $limit,
            mark_slug: $mark_slug,
            folder_slug: $folder_slug,
            sort: $sort,
            gearbox: $gearbox,
            engine_type: $engine_type,
            drive_type: $drive_type,
            body_type: $body_type,
            set: $set,
            price_from: $price_from,
            price_to: $price_to,
        )
        {
            gearbox {
                name
                title
            }
            engineType {
                name
                title
            }
            driveType {
                name
                title
            }
            bodyType {
                name
                title
            }
            count
            price
        }
    }`
export type OfferFilterNewInputType = {
  page?: number
  limit?: number
  mark_slug?: string
  folder_slug?: string
  sort?: string
  gearbox?: string
  engine_type?: string
  drive_type?: string
  body_type?: string
  set?: string
}
export type OfferFilterNewDataType = {
  offerFilter: OfferFilterNewType
}
export type OfferFilterNewType = {
  gearbox: {
    name: string
    title: string
  }[]
  engineType: {
    name: string
    title: string
  }[]
  driveType: {
    name: string
    title: string
  }[]
  bodyType: {
    name: string
    title: string
  }[]
  count: number
  price: number[]
}
