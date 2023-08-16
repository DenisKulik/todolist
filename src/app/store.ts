import { AnyAction, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'
import { tasksReducer } from 'features/Todolists/tasks.reducer'
import { todolistsReducer } from 'features/Todolists/todolists.reducer'
import { appReducer } from 'app/app.reducer'
import { authReducer } from 'features/Login/auth.reducer'

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

// types
export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
