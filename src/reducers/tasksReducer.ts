import { TasksStateType, TaskType } from '../App';

const tasksReducer = (
    state: TasksStateType,
    action: ActionTypes
): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [ action.payload.newTask,
                    ...state[action.payload.todolistId] ]
            };
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    task => task.id !== action.payload.taskId)
            };
        case 'CREATE-NEW-TASKS-TEMPLATE':
            return { ...state, [action.payload.todolistId]: [] };
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
        default:
            throw new Error('Action was not found');
    }
};

type ActionTypes = addTaskACType | deleteTaskACType
    | createNewTasksTemplateACType | changeTaskStatusACType
    | changeTaskTitleACType;
type addTaskACType = ReturnType<typeof addTaskAC>;
type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type createNewTasksTemplateACType = ReturnType<typeof createNewTasksTemplateAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

export const addTaskAC = (newTask: TaskType, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: { newTask, todolistId }
    } as const;
};

export const deleteTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'DELETE-TASK',
        payload: { taskId, todolistId }
    } as const;
};

export const createNewTasksTemplateAC = (todolistId: string) => {
    return {
        type: 'CREATE-NEW-TASKS-TEMPLATE',
        payload: { todolistId }
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