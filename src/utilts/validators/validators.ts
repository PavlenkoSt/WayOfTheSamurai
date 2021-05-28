export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = value => {
    if(value) return undefined
    return 'Это поле не может быть отправлено пустым!'
}

export const maxLengthCreator = (maxLength: number): ValidatorType => value => {
    if( value.length > maxLength) return `Максимальное количество символов - ${maxLength}!`
    return undefined
}