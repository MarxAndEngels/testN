import {DocumentNode} from "graphql/language";

export const countGql: DocumentNode = gql`
    query offers(
        $site_id: Int!
        $mark_slug_array: [String]
        $folder_slug_array: [String]
        $engine_type_id_array: [Int]
        $body_type_id_array: [Int]
        $gearbox_id_array: [Int]
        $drive_type_id_array: [Int]
        $year_from: Int
        $year_to: Int
        $price_from: Int
        $price_to: Int
    ){
        offers(
            site_id: $site_id,
            mark_slug_array: $mark_slug_array,
            folder_slug_array: $folder_slug_array,
            engine_type_id_array: $engine_type_id_array,
            body_type_id_array: $body_type_id_array,
            gearbox_id_array: $gearbox_id_array,
            drive_type_id_array: $drive_type_id_array,
            year_from: $year_from,
            year_to: $year_to,
            price_from: $price_from,
            price_to: $price_to
        ) {
            total
        }
    }`
export type CountInputType = {
    mark_slug_array?: string[] | null
    folder_slug_array?: string[] | null
    engine_type_id_array?: number[]
    body_type_id_array?: number[]
    gearbox_id_array?: number[]
    drive_type_id_array?: number[]
    year_from?: number
    year_to?: number
    price_from?: number
    price_to?: number
}
export type CountTypeData = {
    offers: {
        total: number
    }
}
