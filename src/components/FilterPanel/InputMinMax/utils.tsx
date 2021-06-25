export const MoneyFormat = (amount: number): string => {
    return amount
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, '$&.')
        .slice(0, -3);
}

export const NumberCleaner = (number: string): {real: number, masking: string} => {
    const real = parseFloat(number.replace(/[^0-9]/g, ''));
    const masking = MoneyFormat(real);

    return { real, masking };
}
