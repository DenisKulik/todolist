import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions, RequestStatusType } from 'app/app.reducer'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
import { ResultCode } from 'common/enums'
import {
    todolistAPI,
    TodolistType,
    UpdateTodolistTitleType,
} from 'features/Todolists/todolists.api'
import { tasksThunks } from 'features/Todolists/tasks.reducer'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
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
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(todolist => ({
                    ...todolist,
                    filter: 'all',
                    entityStatus: 'idle',
                }))
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todolistId)
                if (index !== -1) state[index].title = action.payload.title
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
    },
})

// thunks
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
    'todolists/fetchTodolists',
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistAPI.getTodolists()
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            res.data.forEach(todolist => {
                dispatch(tasksThunks.fetchTasks(todolist.id))
            })
            return { todolists: res.data }
        })
    },
)

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    'todolists/addTodolist',
    async (title, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { todolist: res.data.data.item }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

export const updateTodolistTitle = createAppAsyncThunk<
    UpdateTodolistTitleType,
    UpdateTodolistTitleType
>('todolists/updateTodolistTitle', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(
            todolistsActions.changeTodolistEntityStatus({
                todolistId: arg.todolistId,
                entityStatus: 'loading',
            }),
        )
        const res = await todolistAPI.updateTodolistTitle({
            todolistId: arg.todolistId,
            title: arg.title,
        })
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            dispatch(
                todolistsActions.changeTodolistEntityStatus({
                    todolistId: arg.todolistId,
                    entityStatus: 'idle',
                }),
            )
            return arg
        } else {
            dispatch(
                todolistsActions.changeTodolistEntityStatus({
                    todolistId: arg.todolistId,
                    entityStatus: 'idle',
                }),
            )
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

export const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
    'todolists/deleteTodolist',
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            dispatch(
                todolistsActions.changeTodolistEntityStatus({
                    todolistId,
                    entityStatus: 'loading',
                }),
            )
            const res = await todolistAPI.deleteTodolist(todolistId)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { todolistId }
            } else {
                dispatch(
                    todolistsActions.changeTodolistEntityStatus({
                        todolistId,
                        entityStatus: 'idle',
                    }),
                )
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodolists, addTodolist, updateTodolistTitle, deleteTodolist }

// types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
