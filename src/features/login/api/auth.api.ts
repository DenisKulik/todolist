import { AxiosResponse } from 'axios'
import { instance } from 'common/api'
import { ResponseType } from 'common/types'
import {
    AuthUserType,
    getCaptchaUrlType,
    LoginArgType,
} from 'features/login/api/types/auth.api.types'

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

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>('security/get-captcha-url').then(res => res.data)
    },
}
