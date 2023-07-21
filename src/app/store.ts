import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import tasksReducer, { TasksActionsType } from '../features/Todolists/tasksReducer'
import todolistsReducer, { TodolistsActionsType } from '../features/Todolists/todolistsReducer'
import { AppActionsType, appReducer } from './appReducer'
import { authReducer } from '../features/Login/authReducer'

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    ActionsType
>
