import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginType) {
        return instance.post<ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginType>('auth/login', data);
    }
};

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
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>, UpdateTaskModelType>
        >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};

// types
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

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

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10
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

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
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

export type ErrorType = {
    statusCode: number,
    messages: [
        {
            message: string,
            field: string
        }
    ],
    error: string
}