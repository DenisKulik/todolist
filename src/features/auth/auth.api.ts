import { AxiosResponse } from 'axios'
import { instance, ResponseType } from 'common/api'

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthUserType>>('auth/me')
    },
    login(arg: LoginArgType) {
        return instance.post<
            ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginArgType
        >('auth/login', arg)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
}

// types
export type AuthUserType = {
    id: number
    email: string
    login: string
}
export type LoginArgType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
