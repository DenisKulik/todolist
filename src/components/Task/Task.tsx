import { memo, useCallback } from 'react';
import CustomCheckbox from '../ChexboxItem/CustomCheckbox';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import {
    changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC
} from '../../state/tasksReducer';
import { TaskStatuses, TaskType } from '../../api/todolistAPI';
import { useAppDispatch } from '../../state/store';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = (props: TaskPropsType) => {
    const { task, todolistId } = props;

    const dispatch = useAppDispatch();

    const deleteTask = useCallback(() => {
        dispatch(deleteTaskTC(todolistId, task.id));
    }, [ dispatch, task.id, todolistId ]);

    const changeTaskStatus = useCallback((checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(changeTaskStatusAC(task.id, status, todolistId));
    }, [ dispatch, task.id, todolistId ]);

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId));
    }, [ dispatch, task.id, todolistId ]);

    return (
        <ListItem
            className={task.status === TaskStatuses.Completed ? 'isDone' : ''}
            key={task.id}>
            <CustomCheckbox
                checked={task.status === TaskStatuses.Completed}
                callback={changeTaskStatus}
            />
            <EditableSpan
                title={task.title}
                callback={changeTaskTitle}
            />
            <IconButton
                size="small"
                onClick={deleteTask}
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