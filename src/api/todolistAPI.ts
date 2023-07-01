import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>,
            AxiosResponse<ResponseType<{ item: TodolistType }>>,
            { title: string }>('todo-lists', { title });
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>,
            { title: string }>(`todo-lists/${todolistId}`, { title }
        );
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }
        >(`todo-lists/${todolistId}/tasks`, { title });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        );
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>, TaskType[]>
        >(`todo-lists/${todolistId}/tasks/${taskId}`, { title });
    },
};

// types
export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}