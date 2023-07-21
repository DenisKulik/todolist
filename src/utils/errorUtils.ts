import { Dispatch } from 'redux'
import { ResponseType } from 'api/todolistAPI'
import { appActions } from 'app/appReducer'

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({ error: data.messages[0] }))
    } else {
        dispatch(appActions.setAppError({ error: 'Some error occurred' }))
    }
    dispatch(appActions.setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (dispatch: Dispatch, errorMessage: string) => {
    dispatch(appActions.setAppStatus({ status: 'failed' }))
    dispatch(appActions.setAppError({ error: errorMessage }))
}
