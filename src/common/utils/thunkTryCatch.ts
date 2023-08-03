import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { AppDispatchType, AppRootStateType } from 'app/store'
import { appActions } from 'app/app.reducer'
import { ResponseType } from 'common/types'

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({ status: 'idle' }))
    }
}
