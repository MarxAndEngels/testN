import {ModificationType} from "~/app/types/modification";

export type FolderDataType = {
    folders: {
        data: FolderCatalogType[]
    }

}

export type FolderType = {
    id: number
    title: string
    title_cyrillic?: string
    offers_count: number
    slug: string
    taxi: boolean
    availability: boolean
    arrival: boolean
}

export type FolderCatalogType = {
    id: number
    title: string
    slug: string
    arrival: boolean
    availability: boolean
    min_price: number
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
        slug: number
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
    }
}

export type FoldersInput = {
    page?: number | null
    limit?: number
    mark_slug?: string
    sort?: any
    popular?: boolean
    taxi?: boolean
}

export type FolderPageInput = {
    mark_slug: string
    slug: string
}

export type FolderPageDataType = {
    folder: FolderPageType
}

export type FolderPageType = {
    id: number
    title: string
    title_cyrillic: string
    slug: string
    arrival: boolean
    availability: boolean
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
        warranty_year: number,
        warranty_km: number,
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
    taxi: boolean
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

