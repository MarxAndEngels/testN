import {DocumentNode} from "graphql/language";

export const folderGql: DocumentNode = gql`query folder($site_id: Int!, $mark_slug:String, $slug:String) {
    folder(site_id: $site_id,mark_slug:$mark_slug,slug:$slug)
    {
        id
        title
        title_cyrillic
        slug
        arrival
        availability
        min_price
        min_price_old
        time
        fuel
        engine_power
        engine_power_kvt
        max_speed
        body_length
        body_height
        body_width
        wheelbase
        clearance
        distance_reserve
        mark{
            id
            title
            title_cyrillic
            slug
        }
        bodyType{
            id
            name
            title
        }
        modifications{
            id
            title
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
            engine_volume
            engine_power
            engine_power_kvt
            tech_params{
                title
                value
            }
            complectations(site_id: $site_id) {
                id
                title
                equipment {
                    title
                    values
                }
                price
                price_old
            }
        }
        colors{
            id
            slug
            title
            hex_code
            roof_hex_code
            image{
                medium
                medium_webp
                large
                large_webp
                original
            }
        }
        image{
            image_tiny
            image_tiny_webp
            image_small
            image_small_webp
            image_medium
            image_medium_webp
            image_large
            image_large_webp
            original
        }
        images{
            medium
            medium_webp
            large
            large_webp
            original
        }
        interior_images{
            medium
            medium_webp
            large
            large_webp
            original
        }
        exterior_images{
            medium
            medium_webp
            large
            large_webp
            original
        }
    }
}`

export type FolderPageInput = {
    mark_slug: string
    slug: string
}

export type FolderPageDataType = {
    folder: FolderPageType
}


export type ComplectationType = {
    id: number
    title: string
    equipment: {
        title: string
        values: []
    }[]
    price: number
    price_old: number
}
export type ModificationType = {
    id: number
    title: string
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
    engine_power: number,
    engine_volume: number | null,
    engine_power_kvt: number | null,
    tech_params: {
        title: string
        value: string
    }[]
    complectations: ComplectationType[]
}


export type FolderPageType = {
    id: number
    title: string
    title_cyrillic: string
    slug: string
    arrival:boolean
    availability:boolean
    min_price: number
    min_price_old: number
    time: string
    fuel: number
    engine_power: number | null
    engine_power_kvt: number | null
    max_speed: number
    body_length: number
    body_height: number
    body_width: number
    wheelbase: number
    clearance: number
    distance_reserve?: number
    mark: {
        id: number
        title: string
        title_cyrillic: string
        slug: string
    }
    bodyType: {
        id: number
        name: string
        title: string
    }
    colors: FolderColorType[]
    modifications: ModificationType[]
    image: {
        image_tiny: string
        image_tiny_webp: string
        image_small: string
        image_small_webp: string
        image_medium: string
        image_medium_webp: string
        image_large: string
        image_large_webp: string
        original: string
    }
    images: FolderMedia[]
    interior_images: FolderMedia[]
    exterior_images: FolderMedia[]
}

export type FolderMedia = {
    medium: string
    medium_webp: string
    large: string
    large_webp: string
    original: string
}

export type FolderColorType = {
    id: number
    slug: string
    title: string
    hex_code: string
    roof_hex_code?: string
    image: {
        medium: string
        medium_webp: string
        large: string
        large_webp: string
        original: string
    }
}


