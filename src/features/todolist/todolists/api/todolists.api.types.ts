export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export type UpdateTodolistTitleType = {
    todolistId: string
    title: string
}
