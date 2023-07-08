import {
    AddTodolistAC, DeleteTodolistAC, SetTodolistsAC
} from './todolistsReducer';
import {
    ResultCode,
    TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType
} from '../../api/todolistAPI';
import { Dispatch } from 'redux';
import {
    ActionsType, AppRootStateType, AppThunkType
} from '../../app/store';
import {
    setError, SetErrorType, setLoadingStatus, SetLoadingStatusType
} from '../../app/appReducer';

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
                ...state, [action.payload.todolistId]: action.payload.tasks
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [ action.payload.task,
                    ...state[action.payload.task.todoListId], ]
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

// thunks
export const getTasksTC = (todolistId: string): AppThunkType => async (
    dispatch: Dispatch<ActionsType>
) => {
    try {
        dispatch(setLoadingStatus('loading'));
        const res = await todolistAPI.getTasks(todolistId);
        dispatch(setTasksAC(todolistId, res.data.items));
        dispatch(setLoadingStatus('succeeded'));
    } catch (e) {
        console.error(e);
    }
};

export const createTaskTC = (
    todolistId: string,
    title: string
): AppThunkType => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setLoadingStatus('loading'));
        const res = await todolistAPI.createTask(todolistId, title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setLoadingStatus('succeeded'));
        } else {
            res.data.messages.length ?
                dispatch(setError(res.data.messages[0])) :
                dispatch(setError('Something went wrong!'));
            dispatch(setLoadingStatus('failed'));
        }
    } catch (e) {
        dispatch(setLoadingStatus('failed'));
        dispatch(setError((e as Error).message));
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
        dispatch(setLoadingStatus('loading'));
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

            await todolistAPI.updateTask(todolistId, taskId, model);
            dispatch(updateTaskAC(todolistId, taskId, model));
            dispatch(setLoadingStatus('succeeded'));
        }
    } catch (e) {
        console.error(e);
    }
};

export const deleteTaskTC = (
    todolistId: string,
    taskId: string
): AppThunkType => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setLoadingStatus('loading'));
        const res = await todolistAPI.deleteTask(todolistId, taskId);
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC(todolistId, taskId));
            dispatch(setLoadingStatus('succeeded'));
        }
    } catch (e) {
        console.error(e);
    }
};

// types
export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type TasksActionsType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof updateTaskAC>
    | SetTodolistsAC
    | AddTodolistAC
    | DeleteTodolistAC
    | SetLoadingStatusType
    | SetErrorType;

type UpdateTaskType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: Date;
    deadline?: Date;
}

export default tasksReducer;