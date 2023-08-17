import {
    AnyAction,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
    PayloadAction,
} from '@reduxjs/toolkit'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher(isPending, state => {
                state.status = 'loading'
            })
            .addMatcher(isFulfilled, state => {
                state.status = 'succeeded'
            })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                const { payload, error } = action
                if (payload) {
                    if (payload.showGlobalError) {
                        state.error = payload.data.messages.length
                            ? payload.data.messages[0]
                            : 'Some error occurred'
                    }
                } else {
                    state.error = error.message ? error.message : 'Some error occurred'
                }
                state.status = 'failed'
            })
    },
})

export const appSlice = slice.reducer
export const appActions = slice.actions

// types
export type InitialAppStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
