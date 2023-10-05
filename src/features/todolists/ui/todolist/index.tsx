import { memo } from 'react'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { AddItemForm } from 'common/components/add-Item-form'
import { tasksThunks } from 'features/todolists/model/tasks.slice'
import { TodolistDomainType } from 'features/todolists/model/todolists.slice'
import { useActions } from 'common/hooks'
import { FilterTasksButtons } from 'features/todolists/ui/todolist/filter-tasks-buttons'
import { Tasks } from 'features/todolists/ui/todolist/tasks'
import { TodolistHeader } from 'features/todolists/ui/todolist/todolist-header'

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
        <Grid item key={todolist.id}>
            <StyledPaper elevation={3}>
                <TodolistHeader todolistId={id} title={title} entityStatus={entityStatus} />
                <AddItemForm addItem={onAddTask} disabled={entityStatus === 'loading'} />
                <Tasks filter={filter} todolistId={id} />
                <FilterTasksButtons filter={filter} todolistId={id} />
            </StyledPaper>
        </Grid>
    )
})

// styles
const StyledPaper = styled(Paper)`
    max-width: 320px;
    width: 100%;
    padding: 10px;
`
