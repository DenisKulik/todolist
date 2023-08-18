export type AuthUserType = {
    id: number
    email: string
    login: string
}

export type LoginArgType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type getCaptchaUrlType = {
    url: string
}
