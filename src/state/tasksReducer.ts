import {
    addTodolistACType, deleteTodolistACType, setTodolistsACType
} from './todolistsReducer';
import { TaskStatuses, TaskType, todolistAPI } from '../api/todolistAPI';
import { Dispatch } from 'redux';

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

const initialState: TasksStateType = {};

const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionTypes
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
                [action.payload.todolistId]: action.payload.tasks
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
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId ?
                        { ...task, status: action.payload.status } : task)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId ?
                        { ...task, title: action.payload.title } : task)
            };
        case 'ADD-TODOLIST':
            return { ...state, [action.payload.todolistId]: [] };
        case 'DELETE-TODOLIST':
            const stateCopy = { ...state };
            delete stateCopy[action.payload.todolistId];
            return stateCopy;
        default:
            return state;
    }
};

type ActionTypes = ReturnType<typeof setTasksAC>
    | addTaskACType
    | deleteTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | deleteTodolistACType
    | setTodolistsACType;
type addTaskACType = ReturnType<typeof addTaskAC>;
type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: { todolistId, tasks }
    } as const;
};

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: { task }
    } as const;
};

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE-TASK',
        payload: { todolistId, taskId }
    } as const;
};

export const changeTaskStatusAC = (
    taskId: string, status: TaskStatuses, todolistId: string
) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: { taskId, status, todolistId }
    } as const;
};

export const changeTaskTitleAC = (
    taskId: string, title: string, todolistId: string
) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: { taskId, title, todolistId }
    } as const;
};

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI
        .getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items));
        });
};

export const createTaskTC = (
    todolistId: string,
    title: string
) => (dispatch: Dispatch) => {
    todolistAPI
        .createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item));
        });
};

export const deleteTaskTC = (
    todolistId: string,
    taskId: string
) => (dispatch: Dispatch) => {
    todolistAPI
        .deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId));
            }
        });
};

export default tasksReducer;