import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatchType, AppRootStateType } from 'app/model/store'
import { ResponseType } from 'common/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null | ResponseType
}>()
