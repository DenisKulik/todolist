import { TaskType } from '../components/Todolist/Todolist';
import { addTodolistACType, deleteTodolistACType } from './todolistsReducer';
import { v1 } from 'uuid';

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

const initialState: TasksStateType = {};

const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionTypes
): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [ {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                },
                    ...state[action.payload.todolistId] ]
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
                        { ...task, isDone: action.payload.value } : task)
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

type ActionTypes = addTaskACType | deleteTaskACType | changeTaskStatusACType
    | changeTaskTitleACType | addTodolistACType | deleteTodolistACType;
type addTaskACType = ReturnType<typeof addTaskAC>;
type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: { title, todolistId }
    } as const;
};

export const deleteTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'DELETE-TASK',
        payload: { taskId, todolistId }
    } as const;
};

export const changeTaskStatusAC = (
    taskId: string, value: boolean, todolistId: string
) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: { taskId, value, todolistId }
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

export default tasksReducer;