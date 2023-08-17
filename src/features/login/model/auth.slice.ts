import { createSlice } from '@reduxjs/toolkit'

import { appActions } from 'app/model/app.slice'
import { ResultCode } from 'common/enums'
import { createAppAsyncThunk } from 'common/utils'
import { authAPI, LoginArgType } from 'features/login/api/auth.api'
import { todolistsActions } from 'features/todolists/model/todolists.slice'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
})

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginArgType>(
    'auth/login',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await authAPI.login(arg)
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            const isShowAppError = !res.data.fieldsErrors.length
            return rejectWithValue({ data: res.data, showGlobalError: isShowAppError })
        }
    },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
    'auth/logout',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            dispatch(todolistsActions.clearTodolists())
            return { isLoggedIn: false }
        } else {
            return rejectWithValue({ data: res.data, showGlobalError: false })
        }
    },
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
    'auth/initializeApp',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === ResultCode.SUCCESS) {
                return { isLoggedIn: true }
            } else {
                return rejectWithValue({ data: res.data, showGlobalError: false })
            }
        } finally {
            dispatch(appActions.setInitialized({ isInitialized: true }))
        }
    },
)

export const authSlice = slice.reducer
export const authThunks = { login, logout, initializeApp }
