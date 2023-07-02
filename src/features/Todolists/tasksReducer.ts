import {
    AddTodolistAC, DeleteTodolistAC, SetTodolistsAC
} from './todolistsReducer';
import {
    TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType
} from '../../api/todolistAPI';
import { Dispatch } from 'redux';
import { AppActionsType, AppRootStateType } from '../../app/store';

const initialState: TasksStateType = {};

const tasksReducer = (
    state: TasksStateType = initialState,
    action: AppActionsType
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
    todolistId: string, taskId: string, model: UpdateTaskModelType
) => ({
    type: 'UPDATE-TASK',
    payload: { todolistId, taskId, model }
} as const);

// thunks
export const getTasksTC = (todolistId: string) => (
    dispatch: Dispatch<AppActionsType>
) => {
    todolistAPI
        .getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items));
        });
};

export const createTaskTC = (
    todolistId: string,
    title: string
) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI
        .createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item));
        });
};

export const updateTaskTC = (
    todolistId: string,
    taskId: string,
    data: UpdateTaskType
) => (dispatch: Dispatch<AppActionsType>,
    getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId);

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

        todolistAPI
            .updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(updateTaskAC(todolistId, taskId, model));
            });
    }
};

export const deleteTaskTC = (
    todolistId: string,
    taskId: string
) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI
        .deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId));
            }
        });
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
    | DeleteTodolistAC;

type UpdateTaskType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: Date;
    deadline?: Date;
}

export default tasksReducer;