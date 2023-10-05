import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import styled from 'styled-components'

import { TaskDomainType, tasksThunks } from 'features/todolists/model/tasks.slice'
import { CustomCheckbox } from 'common/components/checkbox-item'
import { EditableSpan } from 'common/components/editable-span'
import { useActions } from 'common/hooks'
import { TaskStatuses } from 'common/enums'

type Props = {
    task: TaskDomainType
}

export const Task = memo(({ task }: Props) => {
    const { deleteTask, updateTask } = useActions(tasksThunks)

    const onDeleteTask = () => {
        deleteTask({ todolistId: task.todoListId, taskId: task.id })
    }
    const onChangeTaskStatus = (checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ todolistId: task.todoListId, taskId: task.id, model: { status } })
    }
    const onChangeTaskTitle = (title: string) => {
        updateTask({ todolistId: task.todoListId, taskId: task.id, model: { title } })
    }

    return (
        <ListItem className={task.status === TaskStatuses.Completed ? 'isDone' : ''} key={task.id}>
            <CustomCheckbox
                checked={task.status === TaskStatuses.Completed}
                callback={onChangeTaskStatus}
                disabled={task.entityStatus === 'loading'}
            />
            <EditableSpan
                title={task.title}
                callback={onChangeTaskTitle}
                disabled={task.entityStatus === 'loading'}
            />
            <StyledIconButton
                size="small"
                onClick={onDeleteTask}
                disabled={task.entityStatus === 'loading'}
            >
                <DeleteIcon fontSize="inherit" />
            </StyledIconButton>
        </ListItem>
    )
})

// styles
const ListItem = styled.div`
    display: flex;
    align-items: center;

    &.isDone {
        opacity: 0.5;
    }
`
const StyledIconButton = styled(IconButton)`
    margin-left: auto !important;
`
