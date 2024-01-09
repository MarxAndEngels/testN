import {defineStore} from 'pinia'

export const useSort = defineStore('sortId', {
    state: () => ({
        sort: null
    }),
    actions: {
        async setSort(payload: any) {
            this.sort = payload
        },
    }
})