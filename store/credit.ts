import {defineStore} from 'pinia'

export type CreditFolderType = {
    mark_slug: string,
    folder_slug: string
    color_index?: number
    complectation?: string
} | null
export type CreditUsedOfferType = {
    mark_slug: string,
    folder_slug: string,
    external_id: number
} | null
export const useCredit = defineStore('credit', {
    state: () => ({
        creditOfferUsed: <CreditUsedOfferType>null,
        creditFolder: <CreditFolderType>null,
        creditOfferNew: undefined
    }),

    actions: {
        async setCreditOfferUsed(data: CreditUsedOfferType) {
            this.creditOfferUsed = data
        },
        async setCreditFolder(data: CreditFolderType) {
            this.creditFolder = data
        },
        async setCreditOfferNew(data: any) {
            this.creditOfferNew = data
        }
    }
})