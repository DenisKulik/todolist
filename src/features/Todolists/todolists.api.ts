import { AxiosResponse } from 'axios'
import { instance, ResponseType } from 'common/api'
import { TaskPriorities, TaskStatuses } from 'common/enums'

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
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(
            `todo-lists/${todolistId}`,
            { title },
        )
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<
            ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>>,
            { title: string }
        >(`todo-lists/${todolistId}/tasks`, { title })
    },
    deleteTask(arg: DeleteTaskArgType) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
    },
    updateTask(arg: UpdateTaskArgType) {
        return instance.put<
            ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>, UpdateTaskModelType>
        >(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, arg.model)
    },
}

// types
export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
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
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}
export type UpdateTaskArgType = {
    todolistId: string
    taskId: string
    model: UpdateTaskModelType
}
export type DeleteTaskArgType = {
    todolistId: string
    taskId: string
}
