import { AxiosResponse } from 'axios'

import { instance } from 'common/api'
import { ResponseType } from 'common/types'
import {
    TodolistType,
    UpdateTodolistTitleType,
} from 'features/todolist/todolists/api/todolists.api.types'

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<
            ResponseType<{ item: TodolistType }>,
            AxiosResponse<ResponseType<{ item: TodolistType }>>,
            { title: string }
        >('todo-lists', { title })
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(arg: UpdateTodolistTitleType) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(
            `todo-lists/${arg.todolistId}`,
            { title: arg.title },
        )
    },
}
