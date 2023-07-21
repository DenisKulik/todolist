import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitialized: false,
    },
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
})

export const appReducer = slice.reducer
export const appActions = slice.actions

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
