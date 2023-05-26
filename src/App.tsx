import { useReducer } from 'react';
import styled from 'styled-components';
import { v1 } from 'uuid';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Todolist from './components/Todolist/Todolist';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import todolistsReducer, {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    deleteTodolistAC
} from './reducers/todolistsReducer';
import tasksReducer, {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC
} from './reducers/tasksReducer';

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
    const todolistsId1 = v1();
    const todolistsId2 = v1();

    const [ todolists, dispachTodolists ] = useReducer(todolistsReducer, [
        { id: todolistsId1, title: 'What to learn', filter: 'all' },
        { id: todolistsId2, title: 'What to buy', filter: 'all' },
    ]);

    const [ tasks, dispachTasks ] = useReducer(tasksReducer, {
        [todolistsId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Rest API', isDone: false },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
        [todolistsId2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Butter', isDone: false },
            { id: v1(), title: 'Meat', isDone: false },
            { id: v1(), title: 'Snacks', isDone: false },
        ]
    });

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispachTodolists(action);
        dispachTasks(action);
    };

    const deleteTodolist = (todolistId: string) => {
        dispachTodolists(deleteTodolistAC(todolistId));
        delete tasks[todolistId];
    };

    const changeTodolistFilter = (value: FilterType, todolistId: string) => {
        dispachTodolists(changeTodolistFilterAC(value, todolistId));
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispachTodolists(changeTodolistTitleAC(title, todolistId));
    };

    const addTask = (title: string, todolistId: string) => {
        dispachTasks(addTaskAC(title, todolistId));
    };

    const deleteTask = (taskId: string, todolistId: string): void => {
        dispachTasks(deleteTaskAC(taskId, todolistId));
    };

    const changeTaskStatus = (
        taskId: string, value: boolean, todolistId: string
    ) => {
        dispachTasks(changeTaskStatusAC(taskId, value, todolistId));
    };

    const changeTaskTitle = (
        taskId: string, title: string, todolistId: string
    ) => {
        dispachTasks(changeTaskTitleAC(taskId, title, todolistId));
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