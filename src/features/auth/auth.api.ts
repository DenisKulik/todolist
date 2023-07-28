import { AxiosResponse } from 'axios'
import { instance, ResponseType } from 'common/api'

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthUserType>>('auth/me')
    },
    login(data: LoginType) {
        return instance.post<
            ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginType
        >('auth/login', data)
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

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
