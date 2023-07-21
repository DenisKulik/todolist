import axios from 'axios'
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
import { AnyAction } from 'redux'
import { TodolistDomainType } from 'features/Todolists/todolistsReducer'

const initialState: TasksStateType = {}

const tasksReducer = (state: TasksStateType = initialState, action: AnyAction): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const newState = { ...state }
            action.payload.todolists.forEach((todolist: TodolistDomainType) => {
                newState[todolist.id] = []
            })
            return newState
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map((task: TaskDomainType) => ({
                    ...task,
                    entityStatus: 'idle',
                })),
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [
                    {
                        ...action.payload.task,
                        entityStatus: 'idle',
                    },
                    ...state[action.payload.task.todoListId],
                ],
            }
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    task => task.id !== action.payload.taskId,
                ),
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId ? { ...task, ...action.payload.model } : task,
                ),
            }
        case 'ADD-TODOLIST':
            return { ...state, [action.payload.todolist.id]: [] }
        case 'DELETE-TODOLIST':
            const stateCopy = { ...state }
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, entityStatus: action.payload.entityStatus }
                        : task,
                ),
            }
        case 'CLEAR-TODOLISTS':
            return {}
        default:
            return state
    }
}

// actions
const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({
        type: 'SET-TASKS',
        payload: { todolistId, tasks },
    }) as const

export const addTaskAC = (task: TaskType) =>
    ({
        type: 'ADD-TASK',
        payload: { task },
    }) as const

export const deleteTaskAC = (todolistId: string, taskId: string) =>
    ({
        type: 'DELETE-TASK',
        payload: { todolistId, taskId },
    }) as const

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
    ({
        type: 'UPDATE-TASK',
        payload: { todolistId, taskId, model },
    }) as const

export const changeTaskEntityStatusAC = (
    todolistId: string,
    taskId: string,
    entityStatus: RequestStatusType,
) =>
    ({
        type: 'CHANGE-TASK-ENTITY-STATUS',
        payload: { todolistId, taskId, entityStatus },
    }) as const

// thunks
export const getTasksTC =
    (todolistId: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await todolistAPI.getTasks(todolistId)
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
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

export const createTaskTC =
    (todolistId: string, title: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await todolistAPI.createTask(todolistId, title)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(addTaskAC(res.data.data.item))
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

export const updateTaskTC =
    (todolistId: string, taskId: string, data: UpdateTaskType): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
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
                    dispatch(updateTaskAC(todolistId, taskId, model))
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            }
        } catch (e) {
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))

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
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
            const res = await todolistAPI.deleteTask(todolistId, taskId)
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))

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

export default tasksReducer
