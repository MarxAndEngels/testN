import {defineStore} from 'pinia'
import {request} from "~/helpers/request";
import {BankType} from "~/apollo/queries/bank/banks";
// import {getBanks} from "~/helpers/request";

export const useBanks = defineStore('banks', {
    state: () => ({
        banks: <BankType[]>[]
    }),

    actions: {
        async setBanks(payload: BankType[]) {
            this.banks = payload
        }
    }
})