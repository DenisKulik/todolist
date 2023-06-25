import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(
            'todo-lists', { title }
        );
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`, { title }
        );
    },
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks`, { title }
        );
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        );
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ title: string }>>(
            `todo-lists/${todolistId}/tasks/${taskId}`, { title }
        );
    },
};