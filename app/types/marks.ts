import {FolderType} from "~/app/types/folders";

export type MarkType = {
    id: number
    title: string
    slug: string
    priority: boolean
    is_active: boolean
    offers_count: number
    title_cyrillic?: string
    warranty_year?: number
    warranty_km?: number
    folders: FolderType[]
}