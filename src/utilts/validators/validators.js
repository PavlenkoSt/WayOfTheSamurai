export const required = value => {
    if(value) return undefined
    return 'Это поле не может быть отправлено пустым!'
}

export const maxLengthCreator = maxLength => value => {
    if( value.length > maxLength) return `Максимальное количество символов - ${maxLength}!`
    return undefined
}