import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Todolist from './components/Todolist/Todolist';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    deleteTodolistAC
} from './state/todolistsReducer';
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC
} from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

const App = () => {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(
        state => state.todolists);

    const tasks = useSelector<AppRootStateType, TasksStateType>(
        state => state.tasks);

    const dispach = useDispatch();

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispach(action);
    };

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId);
        dispach(action);
    };

    const changeTodolistFilter = (value: FilterType, todolistId: string) => {
        dispach(changeTodolistFilterAC(value, todolistId));
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispach(changeTodolistTitleAC(title, todolistId));
    };

    const addTask = (title: string, todolistId: string) => {
        dispach(addTaskAC(title, todolistId));
    };

    const deleteTask = (taskId: string, todolistId: string): void => {
        dispach(deleteTaskAC(taskId, todolistId));
    };

    const changeTaskStatus = (
        taskId: string, value: boolean, todolistId: string
    ) => {
        dispach(changeTaskStatusAC(taskId, value, todolistId));
    };

    const changeTaskTitle = (
        taskId: string, title: string, todolistId: string
    ) => {
        dispach(changeTaskTitleAC(taskId, title, todolistId));
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

    const todolistsItems: JSX.Element[] = todolists.map(todolist => {
        const tasksForTodolist = getFilteredTasks(tasks[todolist.id],
            todolist.filter);

        return (
            <Grid item key={todolist.id}>
                <StyledPaper elevation={3}>
                    <Todolist
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        filter={todolist.filter}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTodolistFilter={changeTodolistFilter}
                    />
                </StyledPaper>
            </Grid>
        );
    });

    return (
        <div>
            <ButtonAppBar />
            <Container fixed>
                <StyledGrid container>
                    <AddItemForm addItem={addTodolist} />
                </StyledGrid>
                <Grid container spacing={3}>
                    {todolistsItems}
                </Grid>
            </Container>
        </div>
    );
};

const StyledPaper = styled(Paper)`
  padding: 10px;
`;

const StyledGrid = styled(Grid)`
  padding: 20px;
`;

export default App;