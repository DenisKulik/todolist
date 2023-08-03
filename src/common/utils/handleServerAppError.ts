import { Dispatch } from 'redux'
import { ResponseType } from 'common/types'
import { appActions } from 'app/app.reducer'

/**
 * Handles server application errors and updates the app state.
 * @param data - response from the server in ResponseType<T> format
 * @param dispatch - function for sending messages to store Redux
 * @param isShowAppError - flag indicating whether errors should be displayed in the user interface
 * @returns {void}
 */

export const handleServerAppError = <T>(
    dispatch: Dispatch,
    data: ResponseType<T>,
    isShowAppError: boolean = true,
) => {
    if (isShowAppError) {
        dispatch(
            appActions.setAppError({
                error: data.messages.length ? data.messages[0] : 'Some error occurred',
            }),
        )
    }

    dispatch(appActions.setAppStatus({ status: 'failed' }))
}
