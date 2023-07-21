import { Dispatch } from 'redux'
import {
    SetAppErrorActionType,
    setAppStatus,
    SetAppStatusActionType,
    setInitialized,
    SetInitializedActionType,
} from '../../app/appReducer'
import { authAPI, ErrorType, LoginType, ResultCode } from '../../api/todolistAPI'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import axios from 'axios'
import { ClearTodolistsAC, clearTodolistsAC } from '../Todolists/todolistsReducer'

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.payload.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', payload: { value } }) as const

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))

    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('succeeded'))
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

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('succeeded'))
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
        dispatch(setInitialized(true))
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatus('succeeded'))
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

// types
type InitialStateType = typeof initialState

type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetInitializedActionType
    | ClearTodolistsAC
