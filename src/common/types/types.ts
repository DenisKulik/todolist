export type FieldErrorType = {
    error: string
    field: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: FieldErrorType[]
}
