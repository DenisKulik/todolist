import axios from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    ErrorType,
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType,
} from 'api/todolistAPI'
import { AppRootStateType, AppThunkType } from 'app/store'
import { appActions, RequestStatusType } from 'app/appReducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils'
import { todolistsActions } from 'features/Todolists/todolistsReducer'
import { createAppAsyncThunk } from 'utils/createAppAsyncThunk'

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTask: (
            state,
            action: PayloadAction<{
                todolistId: string
                taskId: string
                model: UpdateTaskModelType
            }>,
        ) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model }
        },
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
        deleteTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
            const index = state[action.payload.todolistId].findIndex(
                task => task.id === action.payload.taskId,
            )
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
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
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach(todolist => (state[todolist.id] = []))
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.deleteTodolist, (state, action) => {
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
            const res = await todolistAPI.getTasks(todolistId)
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { todolistId, tasks: res.data.items }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    },
)

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
    'tasks/addTasks',
    async ({ todolistId, title }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await todolistAPI.createTask(todolistId, title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { task: res.data.data.item }
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

export const updateTaskTC =
    (todolistId: string, taskId: string, data: UpdateTaskType): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: 'loading',
                }),
            )
            const task = getState().tasks[todolistId].find(task => task.id === taskId)

            if (task) {
                const model: UpdateTaskModelType = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    ...data,
                }

                const res = await todolistAPI.updateTask(todolistId, taskId, model)
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(tasksActions.updateTask({ todolistId, taskId, model }))
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                    dispatch(
                        tasksActions.changeTaskEntityStatus({
                            todolistId,
                            taskId,
                            entityStatus: 'idle',
                        }),
                    )
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            }
        } catch (e) {
            dispatch(
                tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }),
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

export const deleteTaskTC =
    (todolistId: string, taskId: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: 'loading',
                }),
            )
            const res = await todolistAPI.deleteTask(todolistId, taskId)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(tasksActions.deleteTask({ todolistId, taskId }))
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            dispatch(
                tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }),
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

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask }

// types
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [todolistId: string]: TaskDomainType[]
}

type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}
