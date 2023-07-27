import { Dispatch } from 'redux'
import axios, { AxiosError } from 'axios'
import { ErrorType, ResponseType } from 'api/todolistAPI'
import { appActions } from 'app/appReducer'

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({ error: data.messages[0] }))
    } else {
        dispatch(appActions.setAppError({ error: 'Some error occurred' }))
    }
    dispatch(appActions.setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (dispatch: Dispatch, e: unknown) => {
    const err = e as Error | AxiosError<ErrorType>
    if (axios.isAxiosError<ErrorType>(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setAppError({ error }))
        dispatch(appActions.setAppStatus({ status: 'failed' }))
    } else {
        dispatch(appActions.setAppError({ error: `Native error ${err.message}` }))
    }

    dispatch(appActions.setAppStatus({ status: 'failed' }))
}
