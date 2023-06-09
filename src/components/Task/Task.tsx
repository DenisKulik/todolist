import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CustomCheckbox from '../ChexboxItem/CustomCheckbox';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { TaskType } from '../Todolist/Todolist';
import {
    changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC
} from '../../state/tasksReducer';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = (props: TaskPropsType) => {
    const { task, todolistId } = props;

    const dispatch = useDispatch();

    const deleteTask = useCallback(() => {
        dispatch(deleteTaskAC(task.id, todolistId));
    }, [ dispatch ]);

    const changeTaskStatus = useCallback((status: boolean) => {
        dispatch(changeTaskStatusAC(task.id, status, todolistId));
    }, [ dispatch ]);

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId));
    }, [ dispatch ]);

    return (
        <ListItem className={task.isDone ? 'isDone' : ''} key={task.id}>
            <CustomCheckbox
                checked={task.isDone}
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