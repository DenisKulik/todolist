import { authSlice, authThunks } from 'features/login/model/auth.slice'
import { createFulfilledAction } from 'common/utils'

describe('auth-reducer', () => {
    let startState: {
        isLoggedIn: boolean
        captchaUrl: string
    }

    beforeEach(() => {
        startState = {
            isLoggedIn: false,
            captchaUrl: '',
        }
    })

    it('should set isLoggedIn when login correctly', () => {
        const action = createFulfilledAction(authThunks.login, { isLoggedIn: true })
        const endState = authSlice(startState, action)

        expect(endState.isLoggedIn).toBeTruthy()
    })

    it('should set isLoggedIn when logout correctly', () => {
        const action = createFulfilledAction(authThunks.logout, { isLoggedIn: false })
        const endState = authSlice(startState, action)

        expect(endState.isLoggedIn).toBeFalsy()
    })

    it('should set captcha correctly', () => {
        const action = createFulfilledAction(authThunks.getCaptcha, { captchaUrl: 'captcha-url' })
        const endState = authSlice(startState, action)

        expect(endState.captchaUrl).toBe('captcha-url')
    })
})
