import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError/handleServerNetworkError'
import { AppDispatchType, AppRootStateType } from 'app/model/store'
import { ResponseType } from 'common/types'

/**
 * Executes a logic function within the context of a Redux thunk, handling errors and dispatching appropriate actions.
 * @param thunkAPI - base Thunk API object containing dispatch and rejectWithValue functions
 * @param logic - function to be executed asynchronously
 * @returns {Promise}
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
}
