import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomCheckbox from 'common/components/ChexboxItem/CustomCheckbox'
import EditableSpan from 'common/components/EditableSpan/EditableSpan'
import styled from 'styled-components'
import { tasksThunks } from 'features/Todolists/tasks.reducer'
import { useActions } from 'common/hooks'
import { TaskStatuses } from 'common/enums'
import { RequestStatusType } from 'app/app.reducer'
import { TaskType } from 'features/Todolists/todolists.api'

const Task = ({ task, todolistId, entityStatus }: TaskPropsType) => {
    const { deleteTask, updateTask } = useActions(tasksThunks)

    const onDeleteTask = () => {
        deleteTask({ todolistId, taskId: task.id })
    }
    const onChangeTaskStatus = (checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ todolistId, taskId: task.id, model: { status } })
    }
    const onChangeTaskTitle = (title: string) => {
        updateTask({ todolistId, taskId: task.id, model: { title } })
    }

    return (
        <ListItem className={task.status === TaskStatuses.Completed ? 'isDone' : ''} key={task.id}>
            <CustomCheckbox
                checked={task.status === TaskStatuses.Completed}
                callback={onChangeTaskStatus}
                disabled={entityStatus === 'loading'}
            />
            <EditableSpan
                title={task.title}
                callback={onChangeTaskTitle}
                disabled={entityStatus === 'loading'}
            />
            <IconButton size="small" onClick={onDeleteTask} disabled={entityStatus === 'loading'}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </ListItem>
    )
}

// styles
const ListItem = styled.div`
    &.isDone {
        opacity: 0.5;
    }
`

export default memo(Task)

// types
type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}
