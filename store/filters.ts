import {defineStore} from 'pinia'

export const useShowFilter = defineStore('showFilterId', {
    state: () => ({
        showFilter: true
    }),
    actions: {
        async setShowFilter(payload: boolean) {
            this.showFilter = payload
        },
    }
})