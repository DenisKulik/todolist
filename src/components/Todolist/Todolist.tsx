import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { AppRootStateType, useAppDispatch } from '../../state/store';
import { createTaskTC, getTasksTC } from '../../state/tasksReducer';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, deleteTodolistTC, FilterType
} from '../../state/todolistsReducer';
import CustomButton from '../CustomButton/CustomButton';
import Task from '../Task/Task';
import { TaskStatuses, TaskType } from '../../api/todolistAPI';

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterType
}

const Todolist = (props: TodolistPropsType) => {
    const { todolistId, title, filter } = props;

    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[todolistId]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksTC(todolistId));
    }, [ dispatch ]);

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(todolistId, title));
    }, [ dispatch, todolistId ]);

    const deleteTodolistHandler = useCallback(() => {
        dispatch(deleteTodolistTC(todolistId));
    }, [ dispatch, todolistId ]);

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId));
    }, [ dispatch, todolistId ]);

    const changeTodolistFilterHandler = useCallback((
        value: FilterType,
        todolistId: string
    ) => {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }, [ dispatch ]);

    const onAllClickHandler = useCallback(() => {
        changeTodolistFilterHandler('all', todolistId);
    }, [ changeTodolistFilterHandler, todolistId ]);

    const onActiveClickHandler = useCallback(() => {
        changeTodolistFilterHandler('active', todolistId);
    }, [ changeTodolistFilterHandler, todolistId ]);

    const onCompletedClickHandler = useCallback(() => {
        changeTodolistFilterHandler('completed', todolistId);
    }, [ changeTodolistFilterHandler, todolistId ]);

    const getFilteredTasks = (
        tasks: TaskType[],
        filter: FilterType
    ): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => task.status === TaskStatuses.New);
            case 'completed':
                return tasks.filter(
                    task => task.status === TaskStatuses.Completed);
            default:
                return tasks;
        }
    };

    const tasksForTodolist = getFilteredTasks(tasks, filter);

    const tasksItems: JSX.Element[] = tasksForTodolist.map(task => {
        return (
            <Task
                key={task.id}
                task={task}
                todolistId={todolistId}
            />
        );
    });

    return (
        <div>
            <Header>
                <Title>
                    <EditableSpan
                        title={title}
                        callback={changeTodolistTitle}
                    />
                </Title>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </Header>
            <AddItemForm addItem={addTask} />
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
    );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h3`
  margin: 0;
`;

const TasksWrapper = styled.div`
  margin-bottom: 10px;
`;

export default memo(Todolist);