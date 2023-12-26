export const declension = (count: number, one: string, few: string, many: string) => {
    const isFloat: boolean = Math.round(count) !== count;
    let declension: string = many;
    if (isFloat) {
        declension = few;
    } else {
        const units: number = Math.abs(count % 10);
        const tens: number = Math.abs(count % 100);
        if (units === 1 && tens !== 11) {
            declension = one;
        } else if (2 <= units && units <= 4 && (tens < 10 || 20 <= tens)) {
            declension = few;
        }
    }
    return declension;
}