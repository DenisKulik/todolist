import { AppRootStateType } from 'app/model/store'

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectError = (state: AppRootStateType) => state.app.error
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
