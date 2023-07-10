import { memo, useCallback } from 'react';
import CustomCheckbox from '../../../../components/ChexboxItem/CustomCheckbox';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { deleteTaskTC, updateTaskTC } from '../../tasksReducer';
import { TaskStatuses, TaskType } from '../../../../api/todolistAPI';
import { useAppDispatch } from '../../../../app/store';
import { RequestStatusType } from '../../../../app/appReducer';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}

const Task = (props: TaskPropsType) => {
    const { task, todolistId, entityStatus } = props;

    const dispatch = useAppDispatch();

    const deleteTask = useCallback(() => {
        dispatch(deleteTaskTC(todolistId, task.id));
    }, [ dispatch, task.id, todolistId ]);

    const changeTaskStatus = useCallback((checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC(todolistId, task.id, { status }));
    }, [ dispatch, task.id, todolistId ]);

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(todolistId, task.id, { title }));
    }, [ dispatch, task.id, todolistId ]);

    return (
        <ListItem
            className={task.status === TaskStatuses.Completed ? 'isDone' : ''}
            key={task.id}>
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
            <IconButton
                size="small"
                onClick={deleteTask}
                disabled={entityStatus === 'loading'}
            >
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </ListItem>
    );
};

const ListItem = styled.div`
  &.isDone {
    opacity: 0.5;
  }
`;

export default memo(Task);