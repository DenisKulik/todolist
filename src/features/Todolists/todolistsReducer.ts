import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions, RequestStatusType } from 'app/appReducer'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCode } from 'common/enums'
import { todolistAPI, TodolistType } from 'features/Todolists/todolists.api'
import { tasksThunks } from 'features/Todolists/tasksReducer'

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
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
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
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, {}>(
    'todolists/fetchTodolists',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await todolistAPI.getTodolists()
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))

            res.data.forEach(todolist => {
                dispatch(tasksThunks.fetchTasks(todolist.id))
            })

            return { todolists: res.data }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    },
)

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    'todolists/addTodolist',
    async (title, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await todolistAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { todolist: res.data.data.item }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    },
)

export const changeTodolistTitle = createAppAsyncThunk<
    { todolistId: string; title: string },
    { todolistId: string; title: string }
>('todolists/changeTodolistTitle', async ({ todolistId, title }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

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
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            dispatch(
                todolistsActions.changeTodolistEntityStatus({
                    todolistId,
                    entityStatus: 'idle',
                }),
            )
            return { todolistId, title }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
    'todolists/deleteTodolist',
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

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
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { todolistId }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    },
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodolists, addTodolist, changeTodolistTitle, deleteTodolist }

// types
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
