import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app/app.reducer'
import { ResultCode } from 'common/enums'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { authAPI, LoginArgType } from 'features/auth/auth.api'
import { todolistsActions } from 'features/Todolists/todolists.reducer'

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
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await authAPI.login(arg)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { isLoggedIn: true }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
    'auth/logout',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await authAPI.logout()
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                dispatch(todolistsActions.clearTodolists())
                return { isLoggedIn: false }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
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
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setInitialized({ isInitialized: true }))
        }
    },
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
