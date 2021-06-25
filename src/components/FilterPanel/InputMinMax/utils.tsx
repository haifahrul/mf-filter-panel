export const NumberMasking = (amount: number): string => {
    if (amount === null || amount === undefined) {
        return '';
    }

    return amount
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, '$&.')
        .slice(0, -3);
}

export const NumberCleaner = (number: string): number => {
    return parseFloat(number.replace(/[^0-9]/g, ''));
}
