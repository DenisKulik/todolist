import { AxiosResponse } from 'axios'

import { instance } from 'common/api'
import { ResponseType } from 'common/types'
import {
    DeleteTaskArgType,
    GetTasksResponse,
    TaskType,
    UpdateTaskArgType,
    UpdateTaskModelType,
} from 'features/todolists/api/types/tasks.api.types'

export const tasksAPI = {
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
