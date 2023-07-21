import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolistAPI'
import {
    setAppError,
    SetAppErrorActionType,
    setAppStatus,
    SetAppStatusActionType,
} from '../app/appReducer'

export const handleServerAppError = <T>(
    dispatch: ErrorUtilsDispatchType,
    data: ResponseType<T>,
) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (
    dispatch: ErrorUtilsDispatchType,
    errorMessage: string,
) => {
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(errorMessage))
}

type ErrorUtilsDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType>
