import { TaskPriorities, TaskStatuses } from 'common/enums'

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

export type GetTasksResponse = {
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
