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