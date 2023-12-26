export const engineVolume = (volume: number) => {
    return volume.toFixed(1);
}
export const numberFormat = (value: number) => {
    if (!value) return '0'
    return new Intl.NumberFormat("ru-RU").format(Number(value));
}
export const creditPrice = (value: number) => {
    let percent: number = 4.9
    let n: number = 96;
    let i: number = percent / 12 / 100;
    let K: number = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    return numberFormat(Math.round(K * value));
}
export const cheaperComplectation = (value: any) => {
    let complectations: any = []
    value.forEach((item: any) => {
        item.complectations.map((complectation: any) => {
            complectations.push({
                complectation: complectation,
                modification: item,
                index: 0
            })
        })
    })
    return complectations.reduce((prev: any, current: any) => {
        if (+current.complectation.price < +prev.complectation.price) {
            current.index = complectations.indexOf(current)
            return current;
        } else {
            return prev;
        }
    })
}
export const allComplectations = (value: any) => {
    let complectations: any[] = []
    value.forEach((item: any) => {
        item.complectations.map((complectation: any) => {
            complectations.push({
                modification: item,
                id: complectation.id,
                title: `${item.title} ${complectation.title}`,
                price: complectation.price,
                price_old: complectation.price_old
            })
        })
    })
    complectations.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price))
    return complectations
}

export const clearPhone = (phone: string) => {
    return phone.replace(/[^+\d]/g, '')
}