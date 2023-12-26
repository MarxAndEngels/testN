import {defineStore} from 'pinia'

export const useHeader = defineStore('header', {
    state: () => ({
        inputIsOpen: <boolean>false
    }),

    actions: {
        async setInputIsOpen(payload: boolean) {
            this.inputIsOpen = payload
        }
    }
})