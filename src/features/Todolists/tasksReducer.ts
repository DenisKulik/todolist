import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions, RequestStatusType } from 'app/appReducer'
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { todolistsActions, todolistsThunks } from 'features/Todolists/todolistsReducer'
import { TaskType, todolistAPI, UpdateTaskModelType } from 'features/Todolists/todolists.api'

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
    'tasks/addTask',
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

const updateTask = createAppAsyncThunk<
    {
        todolistId: string
        taskId: string
        model: UpdateTaskModelType
    },
    { todolistId: string; taskId: string; data: UpdateTaskType }
>('tasks/updateTask', async ({ todolistId, taskId, data }, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        dispatch(
            tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }),
        )
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            dispatch(appActions.setAppError({ error: 'Task not found' }))
            return rejectWithValue(null)
        }

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
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: 'idle',
                }),
            )
            return { todolistId, taskId, model }
        } else {
            handleServerNetworkError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const deleteTask = createAppAsyncThunk<
    { todolistId: string; taskId: string },
    { todolistId: string; taskId: string }
>('tasks/deleteTask', async ({ todolistId, taskId }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

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
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { todolistId, taskId }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, deleteTask }

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
