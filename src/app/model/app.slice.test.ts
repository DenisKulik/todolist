import { appActions, appSlice, InitialAppStateType, RequestStatusType } from 'app/model/app.slice'

describe('app-reducer', () => {
    let startState: InitialAppStateType

    beforeEach(() => {
        startState = {
            status: 'idle' as RequestStatusType,
            error: null as null | string,
            isInitialized: false,
        }
    })

    it('should set error message correctly', () => {
        const endState = appSlice(startState, appActions.setAppError({ error: 'some error' }))

        expect(endState.error).toBe('some error')
    })

    it('should set status correctly', () => {
        const endState = appSlice(startState, appActions.setAppStatus({ status: 'loading' }))

        expect(endState.status).toBe('loading')
    })

    it('should set initialize property correctly', () => {
        const endState = appSlice(startState, appActions.setInitialized({ isInitialized: true }))

        expect(endState.isInitialized).toBe(true)
    })
})
