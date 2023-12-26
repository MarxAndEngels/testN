import {defineStore} from 'pinia'


export type ModalOfferType = {
    id: number
    mark: string
    markId?: number
    folder: string
    folderId?: number
    modification: string
    modificationId?: number
    complectationId?: number
    colorId?: number
    offerId?: number
    title: string
    image: string
    price: number
    tech?: {
        name: string
        value: string
    }[]
    equipment?: any

    folderSlug?: string
    markSlug?: string
    type?: string
    taxi?: boolean
}

export type ModalType = {
    open: boolean
    title: string
    text?: string
    type: string
}

export const useModals = defineStore('modals', {
    state: () => ({
        modal: <ModalType>{
            open: false,
            title: '',
            type: ''
        },
        modalOffer: <ModalOfferType | null>null
    }),
    actions: {

        async openModal(payload: ModalType) {
            this.modal = payload
        },
        async closeModal() {
            this.modal.open = false
            setTimeout(() => {
                this.modal.title = ''
                this.modal.type = ''
                this.modal.text = ''
                this.modalOffer = null
            }, 100)
        },

        async setModalOffer(payload: ModalOfferType) {
            this.modalOffer = payload
        },
    }
})