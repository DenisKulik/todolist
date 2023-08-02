import { memo, useCallback } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import EditableSpan from 'common/components/EditableSpan/EditableSpan'
import { TaskDomainType, tasksThunks } from 'features/Todolists/tasks.reducer'
import {
    FilterType,
    TodolistDomainType,
    todolistsActions,
    todolistsThunks,
} from 'features/Todolists/todolists.reducer'
import Task from 'features/Todolists/Todolist/Task/Task'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { TaskStatuses } from 'common/enums'
import { selectTasks } from 'features/Todolists/tasks.selectors'
import CustomButton from 'common/components/CustomButton/CustomButton'

type TodolistPropsType = {
    todolist: TodolistDomainType
}

const Todolist = (props: TodolistPropsType) => {
    const { id, title, filter, entityStatus } = props.todolist
    const tasks = useAppSelector<TaskDomainType[]>(state => selectTasks(state, id))
    const dispatch = useAppDispatch()

    const addTask = useCallback(
        (title: string) => {
            dispatch(tasksThunks.addTask({ todolistId: id, title }))
        },
        [dispatch, id],
    )

    const deleteTodolistHandler = useCallback(() => {
        dispatch(todolistsThunks.deleteTodolist(id))
    }, [dispatch, id])

    const changeTodolistTitle = useCallback(
        (title: string) => {
            dispatch(todolistsThunks.updateTodolistTitle({ todolistId: id, title }))
        },
        [dispatch, id],
    )

    const changeTodolistFilterHandler = useCallback(
        (filter: FilterType, todolistId: string) => {
            dispatch(todolistsActions.changeTodolistFilter({ filter, todolistId }))
        },
        [dispatch],
    )

    const onAllClickHandler = useCallback(() => {
        changeTodolistFilterHandler('all', id)
    }, [changeTodolistFilterHandler, id])

    const onActiveClickHandler = useCallback(() => {
        changeTodolistFilterHandler('active', id)
    }, [changeTodolistFilterHandler, id])

    const onCompletedClickHandler = useCallback(() => {
        changeTodolistFilterHandler('completed', id)
    }, [changeTodolistFilterHandler, id])

    const getFilteredTasks = (tasks: TaskDomainType[], filter: FilterType): TaskDomainType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => task.status === TaskStatuses.New)
            case 'completed':
                return tasks.filter(task => task.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }

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
                        callback={changeTodolistTitle}
                        disabled={entityStatus === 'loading'}
                    />
                </Title>
                <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
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
                    onClick={onAllClickHandler}
                />
                <CustomButton
                    title="active"
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color="secondary"
                    size="small"
                    onClick={onActiveClickHandler}
                />
                <CustomButton
                    title="completed"
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color="success"
                    size="small"
                    onClick={onCompletedClickHandler}
                />
            </div>
        </div>
    )
}

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

export default memo(Todolist)
