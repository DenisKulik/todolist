import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { FilterType, TaskType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import Checkbox from '../Checkbox/Checkbox';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    addTask: (title: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, value: boolean,
                       todolistId: string) => void
    changeTodolistFilter: (value: FilterType, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

const Todolist = (props: TodolistPropsType) => {
        const {
            todolistId,
            title,
            tasks,
            filter,
            addTask,
            deleteTask,
            changeTaskTitle,
            changeTaskStatus,
            deleteTodolist,
            changeTodolistTitle,
            changeTodolistFilter,
        } = props;

        const addTaskHandler = (title: string) => addTask(title, todolistId);
        const deleteTaskHandler = (id: string) => deleteTask(id, todolistId);
        const deleteTodolistHandler = () => deleteTodolist(todolistId);
        const changeTodolistTitleHandler = (title: string) => {
            changeTodolistTitle(title, todolistId);
        };
        const changeTaskStatusHandler = (status: boolean, id: string) => {
            changeTaskStatus(id, status, todolistId);
        };
        const changeTaskTitleHandler = (title: string, id: string) => {
            changeTaskTitle(id, title, todolistId);
        };

        const tasksItems: JSX.Element[] = tasks.map(task => {
            return (
                <ListItem className={task.isDone ? 'isDone' : ''} key={task.id}>
                    <Checkbox
                        isDone={task.isDone}
                        callback={(changedIsDone) => changeTaskStatusHandler(
                            changedIsDone, task.id)}
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
                    <h3>
                        <EditableSpan
                            title={title}
                            callback={changeTodolistTitleHandler}
                        />
                    </h3>
                    <IconButton onClick={deleteTodolistHandler}>
                        <DeleteIcon />
                    </IconButton>
                </Header>
                <AddItemForm addItem={addTaskHandler} />
                <ul>{tasksItems}</ul>
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
    }
;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ListItem = styled.li`
  &.isDone {
    opacity: 0.5;
  }
`;

export default Todolist;