import { memo, useCallback } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { TaskDomainType, tasksThunks } from 'features/todolists-list/tasks/model/tasks.slice'
import {
    FilterType,
    TodolistDomainType,
    todolistsActions,
    todolistsThunks,
} from 'features/todolists-list/todolists/model/todolists.slice'
import { Task } from 'features/todolists-list/tasks/ui/Task'
import { useActions, useAppSelector } from 'common/hooks'
import { selectTasks } from 'features/todolists-list/tasks/model/tasks.selectors'
import { CustomButton } from 'common/components/CustomButton/CustomButton'
import { getFilteredTasks } from 'common/utils'

type Props = {
    todolist: TodolistDomainType
}

export const Todolist = memo(({ todolist }: Props) => {
    const { id, title, filter, entityStatus } = todolist
    const tasks = useAppSelector<TaskDomainType[]>(state => selectTasks(state, id))
    const { deleteTodolist, updateTodolistTitle, changeTodolistFilter } = useActions({
        ...todolistsThunks,
        ...todolistsActions,
    })
    const { addTask: addTaskThunk } = useActions(tasksThunks)

    const addTask = useCallback(
        (title: string) => {
            addTaskThunk({ todolistId: id, title })
        },
        [addTaskThunk, id],
    )
    const onDeleteTodolist = useCallback(() => {
        deleteTodolist(id)
    }, [deleteTodolist, id])
    const onChangeTodolistTitle = useCallback(
        (title: string) => {
            updateTodolistTitle({ todolistId: id, title })
        },
        [updateTodolistTitle, id],
    )
    const onChangeTodolistFilter = useCallback(
        (filter: FilterType, todolistId: string) => {
            changeTodolistFilter({ filter, todolistId })
        },
        [changeTodolistFilter],
    )
    const onAllTasksClick = useCallback(() => {
        onChangeTodolistFilter('all', id)
    }, [onChangeTodolistFilter, id])
    const onActiveTasksClick = useCallback(() => {
        onChangeTodolistFilter('active', id)
    }, [onChangeTodolistFilter, id])
    const onCompletedTasksClick = useCallback(() => {
        onChangeTodolistFilter('completed', id)
    }, [onChangeTodolistFilter, id])

    const tasksForTodolist = getFilteredTasks(tasks, filter)

    const tasksItems: JSX.Element[] = tasksForTodolist.map(task => {
        return <Task key={task.id} task={task} todolistId={id} entityStatus={task.entityStatus} />
    })

    return (
        <div>
            <Header>
                <Title>
                    <EditableSpan
                        title={title}
                        callback={onChangeTodolistTitle}
                        disabled={entityStatus === 'loading'}
                    />
                </Title>
                <IconButton onClick={onDeleteTodolist} disabled={entityStatus === 'loading'}>
                    <DeleteIcon />
                </IconButton>
            </Header>
            <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'} />
            <TasksWrapper>{tasksItems}</TasksWrapper>
            <div>
                <CustomButton
                    title="all"
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color="primary"
                    size="small"
                    onClick={onAllTasksClick}
                />
                <CustomButton
                    title="active"
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color="secondary"
                    size="small"
                    onClick={onActiveTasksClick}
                />
                <CustomButton
                    title="completed"
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color="success"
                    size="small"
                    onClick={onCompletedTasksClick}
                />
            </div>
        </div>
    )
})

// styles
const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Title = styled.h3`
    margin: 0;
`

const TasksWrapper = styled.div`
    margin-bottom: 10px;
`
