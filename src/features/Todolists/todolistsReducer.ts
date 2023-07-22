import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ErrorType, ResultCode, todolistAPI, TodolistType } from 'api/todolistAPI'
import { AppThunkType } from 'app/store'
import { appActions, RequestStatusType } from 'app/appReducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils'
import { getTasksTC } from './tasksReducer'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map(todolist => ({
                ...todolist,
                filter: 'all',
                entityStatus: 'idle',
            }))
        },
        deleteTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        },
        changeTodolistTitle: (
            state,
            action: PayloadAction<{ todolistId: string; title: string }>,
        ) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistFilter: (
            state,
            action: PayloadAction<{ filter: FilterType; todolistId: string }>,
        ) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>,
        ) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus
        },
        clearTodolists: () => initialState,
    },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// thunks
export const getTodolistsTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        const res = await todolistAPI.getTodolists()
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(todolistsActions.setTodolists({ todolists: res.data }))

        res.data.forEach(todolist => {
            dispatch(getTasksTC(todolist.id))
        })
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }

        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }
}

export const createTodolistTC =
    (title: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await todolistAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response ? e.response?.data.messages[0].message : e.message
                handleServerNetworkError(dispatch, error)
                return
            }

            const error = (e as Error).message
            handleServerNetworkError(dispatch, error)
        }
    }

export const changeTodolistTitleTC =
    (todolistId: string, title: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            dispatch(
                todolistsActions.changeTodolistEntityStatus({
                    todolistId,
                    entityStatus: 'loading',
                }),
            )
            const res = await todolistAPI.updateTodolistTitle(todolistId, title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }))
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                dispatch(
                    todolistsActions.changeTodolistEntityStatus({
                        todolistId,
                        entityStatus: 'idle',
                    }),
                )
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response ? e.response?.data.messages[0].message : e.message
                handleServerNetworkError(dispatch, error)
                return
            }

            const error = (e as Error).message
            handleServerNetworkError(dispatch, error)
        }
    }

export const deleteTodolistTC =
    (todolistId: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            dispatch(
                todolistsActions.changeTodolistEntityStatus({
                    todolistId,
                    entityStatus: 'loading',
                }),
            )
            const res = await todolistAPI.deleteTodolist(todolistId)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(todolistsActions.deleteTodolist({ todolistId }))
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            dispatch(
                todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: 'failed' }),
            )

            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response ? e.response?.data.messages[0].message : e.message
                handleServerNetworkError(dispatch, error)
                return
            }

            const error = (e as Error).message
            handleServerNetworkError(dispatch, error)
        }
    }

// types
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
