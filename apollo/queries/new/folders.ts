import {DocumentNode} from "graphql/language";

export const foldersGql: DocumentNode = gql`query folders($site_id: Int!, $popular: Boolean, $mark_slug:String, $sort: String, $page:Int, $limit:Int) {
    folders(site_id: $site_id,mark_slug:$mark_slug,sort:$sort,page: $page,limit: $limit , popular:$popular)
    {
        data{
            id
            title
            slug
            arrival
            availability
            min_price
            engine_power
            engine_power_kvt
            time
            fuel
            max_speed
            colors{
                id
                hex_code
            }
            mark{
                id
                title
                slug
            }
            image{
                image_medium
                image_medium_webp
                image_large
                image_large_webp
            }
            exterior_images{
                medium
                medium_webp
            }
        }
    }
}`

export type FoldersInput = {
    page?: number | null
    limit?: number
    mark_slug?: string
    sort?: any
    popular?: boolean
}

export type FolderDataType = {
    folders: {
        data: FolderType[]
    }

}

export type FolderType = {
    id: number
    title: string
    slug: string
    min_price: number
    arrival:boolean
    availability:boolean
    engine_power: number
    engine_power_kvt: number
    time: number
    fuel: number
    max_speed: number

    colors: {
        id: number
        hex_code: string
    }[]
    mark: {
        id: number
        title: string
        slug: string
    }
    image: {
        image_medium: string
        image_medium_webp: string
        image_large: string
        image_large_webp: string
    }
    exterior_images: {
        medium: string
        medium_webp: string
    }[]
}




