import { AnyAction, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'
import { tasksSlice } from 'features/todolist/tasks/model/tasks.slice'
import { todolistsSlice } from 'features/todolist/todolists/model/todolists.slice'
import { appSlice } from 'app/model/app.slice'
import { authSlice } from 'features/login/model/auth.slice'

export const rootReducer = combineReducers({
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})

// types
export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
