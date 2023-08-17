import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { appActions, RequestStatusType } from 'app/model/app.slice'
import { ResultCode } from 'common/enums'
import {
    createAppAsyncThunk,
    handleServerAppError,
    handleServerNetworkError,
    thunkTryCatch,
} from 'common/utils'
import {
    todolistsActions,
    todolistsThunks,
} from 'features/todolists-list/todolists/model/todolists.slice'
import { tasksAPI } from 'features/todolists-list/tasks/api/tasks.api'
import {
    DeleteTaskArgType,
    TaskType,
    UpdateTaskArgType,
    UpdateTaskModelType,
} from 'features/todolists-list/tasks/api/tasks.api.types'

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        changeTaskEntityStatus: (
            state,
            action: PayloadAction<{
                todolistId: string
                taskId: string
                entityStatus: RequestStatusType
            }>,
        ) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) tasks[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks.map(task => ({
                    ...task,
                    entityStatus: 'idle',
                }))
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift({
                    ...action.payload.task,
                    entityStatus: 'idle',
                })
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(task => task.id === action.payload.taskId)
                if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(
                    task => task.id === action.payload.taskId,
                )
                if (index !== -1) state[action.payload.todolistId].splice(index, 1)
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(todolist => (state[todolist.id] = []))
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsActions.clearTodolists, () => initialState)
    },
})

// thunks
const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
    'tasks/fetchTasks',
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await tasksAPI.getTasks(todolistId)
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { todolistId, tasks: res.data.items }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    },
)

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
    'tasks/addTask',
    async ({ todolistId, title }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.createTask(todolistId, title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                const task = res.data.data.item
                return { task }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
    'tasks/updateTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todolistId: arg.todolistId,
                    taskId: arg.taskId,
                    entityStatus: 'loading',
                }),
            )
            const task = getState().tasks[arg.todolistId].find(task => task.id === arg.taskId)
            if (!task) {
                dispatch(appActions.setAppError({ error: 'tasks not found' }))
                return rejectWithValue(null)
            }

            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...arg.model,
            }

            const res = await tasksAPI.updateTask({
                todolistId: arg.todolistId,
                taskId: arg.taskId,
                model: apiModel,
            })

            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                dispatch(
                    tasksActions.changeTaskEntityStatus({
                        todolistId: arg.todolistId,
                        taskId: arg.taskId,
                        entityStatus: 'idle',
                    }),
                )
                return arg
            } else {
                dispatch(
                    tasksActions.changeTaskEntityStatus({
                        todolistId: arg.todolistId,
                        taskId: arg.taskId,
                        entityStatus: 'idle',
                    }),
                )
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
    'tasks/deleteTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todolistId: arg.todolistId,
                    taskId: arg.taskId,
                    entityStatus: 'loading',
                }),
            )
            const res = await tasksAPI.deleteTask({
                todolistId: arg.todolistId,
                taskId: arg.taskId,
            })

            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return arg
            } else {
                dispatch(
                    tasksActions.changeTaskEntityStatus({
                        todolistId: arg.todolistId,
                        taskId: arg.taskId,
                        entityStatus: 'idle',
                    }),
                )
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

export const tasksSlice = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, deleteTask }

// types
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksStateType = Record<string, TaskDomainType[]>
