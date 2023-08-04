import { memo } from 'react'
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
import { useActions, useAppSelector } from 'common/hooks'
import { TaskStatuses } from 'common/enums'
import { selectTasks } from 'features/Todolists/tasks.selectors'
import CustomButton from 'common/components/CustomButton/CustomButton'

const Todolist = (props: TodolistPropsType) => {
    const { id, title, filter, entityStatus } = props.todolist
    const tasks = useAppSelector<TaskDomainType[]>(state => selectTasks(state, id))
    const { deleteTodolist, updateTodolistTitle, changeTodolistFilter } = useActions({
        ...todolistsThunks,
        ...todolistsActions,
    })
    const { addTask: addTaskThunk } = useActions(tasksThunks)

    const addTask = (title: string) => {
        addTaskThunk({ todolistId: id, title })
    }
    const onDeleteTodolist = () => {
        deleteTodolist(id)
    }
    const onChangeTodolistTitle = (title: string) => {
        updateTodolistTitle({ todolistId: id, title })
    }
    const onChangeTodolistFilter = (filter: FilterType, todolistId: string) => {
        changeTodolistFilter({ filter, todolistId })
    }
    const onAllTasksClick = () => {
        onChangeTodolistFilter('all', id)
    }
    const onActiveTasksClick = () => {
        onChangeTodolistFilter('active', id)
    }
    const onCompletedTasksClick = () => {
        onChangeTodolistFilter('completed', id)
    }
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
}

export default memo(Todolist)

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

// types
type TodolistPropsType = {
    todolist: TodolistDomainType
}
