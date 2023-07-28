import { memo, useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomCheckbox from 'common/components/ChexboxItem/CustomCheckbox'
import EditableSpan from 'common/components/EditableSpan/EditableSpan'
import styled from 'styled-components'
import { tasksThunks } from '../../tasksReducer'
import { useAppDispatch } from 'common/hooks'
import { TaskStatuses } from 'common/enums'
import { RequestStatusType } from 'app/appReducer'
import { TaskType } from 'features/Todolists/todolists.api'

const Task = (props: TaskPropsType) => {
    const { task, todolistId, entityStatus } = props

    const dispatch = useAppDispatch()

    const deleteTask = useCallback(() => {
        dispatch(tasksThunks.deleteTask({ todolistId, taskId: task.id }))
    }, [dispatch, task.id, todolistId])

    const changeTaskStatus = useCallback(
        (checked: boolean) => {
            const status = checked ? TaskStatuses.Completed : TaskStatuses.New
            dispatch(tasksThunks.updateTask({ todolistId, taskId: task.id, data: { status } }))
        },
        [dispatch, task.id, todolistId],
    )

    const changeTaskTitle = useCallback(
        (title: string) => {
            dispatch(tasksThunks.updateTask({ todolistId, taskId: task.id, data: { title } }))
        },
        [dispatch, task.id, todolistId],
    )

    return (
        <ListItem className={task.status === TaskStatuses.Completed ? 'isDone' : ''} key={task.id}>
            <CustomCheckbox
                checked={task.status === TaskStatuses.Completed}
                callback={changeTaskStatus}
                disabled={entityStatus === 'loading'}
            />
            <EditableSpan
                title={task.title}
                callback={changeTaskTitle}
                disabled={entityStatus === 'loading'}
            />
            <IconButton size="small" onClick={deleteTask} disabled={entityStatus === 'loading'}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </ListItem>
    )
}

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
