import axios from 'axios';
import {
    AddTodolistAC, ClearTodolistsAC, DeleteTodolistAC, SetTodolistsAC
} from './todolistsReducer';
import {
    ErrorType, ResultCode, TaskPriorities, TaskStatuses, TaskType, todolistAPI,
    UpdateTaskModelType
} from '../../api/todolistAPI';
import { Dispatch } from 'redux';
import {
    ActionsType, AppRootStateType, AppThunkType
} from '../../app/store';
import {
    RequestStatusType, SetAppErrorActionType, setAppStatus,
    SetAppStatusActionType,
} from '../../app/appReducer';
import {
    handleServerAppError, handleServerNetworkError
} from '../../utils/errorUtils';

const initialState: TasksStateType = {};

const tasksReducer = (
    state: TasksStateType = initialState,
    action: TasksActionsType
): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const newState = { ...state };
            action.payload.todolists.forEach((todolist) => {
                newState[todolist.id] = [];
            });
            return newState;
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(
                    task => ({ ...task, entityStatus: 'idle' }))
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [ {
                    ...action.payload.task, entityStatus: 'idle'
                }, ...state[action.payload.task.todoListId], ]
            };
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    task => task.id !== action.payload.taskId)
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId ?
                        { ...task, ...action.payload.model } : task)
            };
        case 'ADD-TODOLIST':
            return { ...state, [action.payload.todolist.id]: [] };
        case 'DELETE-TODOLIST':
            const stateCopy = { ...state };
            delete stateCopy[action.payload.todolistId];
            return stateCopy;
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId ?
                        { ...task, entityStatus: action.payload.entityStatus }
                        : task)
            };
        case 'CLEAR-TODOLISTS':
            return {};
        default:
            return state;
    }
};

// actions
const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    payload: { todolistId, tasks }
} as const);

export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    payload: { task }
} as const);

export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE-TASK',
    payload: { todolistId, taskId }
} as const);

export const updateTaskAC = (
    todolistId: string,
    taskId: string,
    model: UpdateTaskModelType
) => ({
    type: 'UPDATE-TASK',
    payload: { todolistId, taskId, model }
} as const);

export const changeTaskEntityStatusAC = (
    todolistId: string,
    taskId: string,
    entityStatus: RequestStatusType
) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    payload: { todolistId, taskId, entityStatus }
} as const);

// thunks
export const getTasksTC = (todolistId: string): AppThunkType => async (
    dispatch: Dispatch<ActionsType>
) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistAPI.getTasks(todolistId);
        dispatch(setTasksAC(todolistId, res.data.items));
        dispatch(setAppStatus('succeeded'));
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

export const createTaskTC = (
    todolistId: string,
    title: string
): AppThunkType => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistAPI.createTask(todolistId, title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setAppStatus('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

export const updateTaskTC = (
    todolistId: string,
    taskId: string,
    data: UpdateTaskType
): AppThunkType => async (
    dispatch: Dispatch<ActionsType>,
    getState: () => AppRootStateType
) => {
    try {
        dispatch(setAppStatus('loading'));
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
        const task = getState().tasks[todolistId].find(
            task => task.id === taskId);

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...data
            };

            const res = await todolistAPI.updateTask(todolistId, taskId, model);
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(updateTaskAC(todolistId, taskId, model));
                dispatch(setAppStatus('succeeded'));
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        }
    } catch (e) {
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'));

        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

export const deleteTaskTC = (
    todolistId: string,
    taskId: string
): AppThunkType => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'));
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
        const res = await todolistAPI.deleteTask(todolistId, taskId);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(deleteTaskAC(todolistId, taskId));
            dispatch(setAppStatus('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'));

        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

// types
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [todolistId: string]: TaskDomainType[]
}

export type TasksActionsType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | SetTodolistsAC
    | AddTodolistAC
    | DeleteTodolistAC
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ClearTodolistsAC

type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}

export default tasksReducer;