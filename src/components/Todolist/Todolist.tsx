import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { FilterType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import CustomCheckbox from '../ChexboxItem/CustomCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC
} from '../../state/tasksReducer';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, deleteTodolistAC
} from '../../state/todolistsReducer';

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    const { todolistId, title, filter, } = props;

    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[todolistId]);

    const dispatch = useDispatch();

    const addTaskHandler = (title: string) => dispatch(
        addTaskAC(title, todolistId));
    const deleteTaskHandler = (id: string) => dispatch(
        deleteTaskAC(id, todolistId));
    const deleteTodolistHandler = () => dispatch(deleteTodolistAC(todolistId));
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId));
    };
    const changeTaskStatusHandler = (status: boolean, id: string) => {
        dispatch(changeTaskStatusAC(id, status, todolistId));
    };
    const changeTaskTitleHandler = (title: string, id: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId));
    };

    const changeTodolistFilter = (value: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId));
    };

    const getFilteredTasks = (
        tasks: TaskType[],
        filter: FilterType
    ): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    };

    const tasksForTodolist = getFilteredTasks(tasks, filter);

    const tasksItems: JSX.Element[] = tasksForTodolist.map(task => {
        return (
            <ListItem className={task.isDone ? 'isDone' : ''} key={task.id}>
                <CustomCheckbox
                    checked={task.isDone}
                    callback={(status) => {
                        changeTaskStatusHandler(status, task.id);
                    }}
                />
                <EditableSpan
                    title={task.title}
                    callback={(title) => changeTaskTitleHandler(title, task.id)}
                />
                <IconButton
                    size="small"
                    onClick={() => deleteTaskHandler(task.id)}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </ListItem>
        );
    });

    return (
        <div>
            <Header>
                <Title>
                    <EditableSpan
                        title={title}
                        callback={changeTodolistTitleHandler}
                    />
                </Title>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </Header>
            <AddItemForm addItem={addTaskHandler} />
            <TasksWrapper>{tasksItems}</TasksWrapper>
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color="primary"
                    size="small"
                    onClick={() => changeTodolistFilter('all', todolistId)}
                >
                    all
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color="secondary"
                    size="small"
                    onClick={() => changeTodolistFilter('active', todolistId)}
                >
                    active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color="success"
                    size="small"
                    onClick={() => changeTodolistFilter('completed',
                        todolistId)}
                >
                    completed
                </Button>
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
`

const ListItem = styled.div`
  &.isDone {
    opacity: 0.5;
  }
`;

export default Todolist;