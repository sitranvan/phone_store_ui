export function formatCurrency(currency) {
    return new Intl.NumberFormat('de-DE').format(currency)
}
