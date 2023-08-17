import { memo } from 'react'

import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { tasksThunks } from 'features/todolists/model/tasks.slice'
import { TodolistDomainType } from 'features/todolists/model/todolists.slice'
import { useActions } from 'common/hooks'
import { FilterTasksButtons } from 'features/todolists/ui/Todolist/FilterTasksButtons/FilterTasksButtons'
import { Tasks } from 'features/todolists/ui/Todolist/Tasks/Tasks'
import { TodolistHeader } from 'features/todolists/ui/Todolist/TodolistHeader/TodolistHeader'

type Props = {
    todolist: TodolistDomainType
}

export const Todolist = memo(({ todolist }: Props) => {
    const { id, title, filter, entityStatus } = todolist
    const { addTask: addTaskThunk } = useActions(tasksThunks)

    const onAddTask = (title: string) => {
        return addTaskThunk({ todolistId: id, title }).unwrap()
    }

    return (
        <>
            <TodolistHeader todolistId={id} title={title} entityStatus={entityStatus} />
            <AddItemForm addItem={onAddTask} disabled={entityStatus === 'loading'} />
            <Tasks filter={filter} todolistId={id} />
            <FilterTasksButtons filter={filter} todolistId={id} />
        </>
    )
})

// styles
