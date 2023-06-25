import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {
        item: TodolistType
    }
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
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
        return instance.post<CreateTodolistResponseType>(
            'todo-lists', { title }
        );
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<DeleteTodolistResponseType>(
            `todo-lists/${todolistId}`
        );
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<UpdateTodolistResponseType>(
            `todo-lists/${todolistId}`, { title }
        );
    },
};