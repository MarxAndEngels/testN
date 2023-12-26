import {numberFormat} from "~/helpers/filters";

export const calculate = (price: number | undefined, payment: number, period: number, installment: boolean = false) => {
    if (price) {
        let creditProc: number = installment ? 0.001 : 4.9;
        let car_price: number = price;
        let creditTime: number = period;
        let firstPay: number = payment;
        let total: number = 0;
        let i: number = creditProc / 12 / 100;
        let n: number = creditTime;
        let S: number
        if (firstPay !== 0) {
            S = car_price - (car_price * firstPay) / 100;
        } else {
            S = car_price;
        }
        let K: number = 0;
        if (car_price) {
            K = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
            total = Math.round(K * S);
            return numberFormat(total)
        } else {
            return '-'
        }
    } else {
        return '-'
    }
}


// if (props.offer) {
//
//     this.paymentPriceValue = ((car_price * firstPay) / 100).toString() + ` руб. (${firstPay}%)`

//     if (car_price) {
//         K = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
//         A = Math.round(K * S);
//         this.total = String(A).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽"
//         //для отображения в блоке рядом с выбранным банком
//         this.setPeriodValue(this.periodValue)
//         this.setMonthPaymentValue(A)
//         //
//     }
// } else {
//     return '-'
// }