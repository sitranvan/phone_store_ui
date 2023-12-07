export function formatCurrency(currency) {
    return new Intl.NumberFormat('de-DE').format(currency)
}
const removeSpecialCharacter = (str) => {
    return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = (name, id) => {
    const nameStr = String(name)
    return removeSpecialCharacter(nameStr).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFormNameId = (nameId) => {
    const arr = nameId.split('-i-')
    // Lấy id là phần tử cuối cùng
    return arr[arr.length - 1]
}
