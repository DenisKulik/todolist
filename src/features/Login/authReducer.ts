import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunkType } from 'app/store'
import { appActions } from 'app/appReducer'
import { authAPI, ErrorType, LoginType, ResultCode } from 'api/todolistAPI'
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils'
import { clearTodolistsAC } from '../Todolists/todolistsReducer'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const loginTC =
    (data: LoginType): AppThunkType =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: 'loading' }))

        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response ? e.response?.data.messages[0].message : e.message
                handleServerNetworkError(dispatch, error)
                return
            }

            const error = (e as Error).message
            handleServerNetworkError(dispatch, error)
        }
    }

export const meTC = (): AppThunkType => async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }

        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(appActions.setInitialized({ isInitialized: true }))
    }
}

export const logoutTC = (): AppThunkType => async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            dispatch(clearTodolistsAC())
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }

        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }
}
