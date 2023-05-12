import { useState } from 'react';
import { v1 } from 'uuid';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Todolist from './components/Todolist/Todolist';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import styled from 'styled-components';

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
    const todolistId_1 = v1();
    const todolistId_2 = v1();
    const [ todolists, setTodolists ] = useState<TodolistType[]>([
        { id: todolistId_1, title: 'What to learn', filter: 'all' },
        { id: todolistId_2, title: 'What to buy', filter: 'all' },
    ]);
    const [ tasks, setTask ] = useState<TasksStateType>({
        [todolistId_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Rest API', isDone: false },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Butter', isDone: false },
            { id: v1(), title: 'Meat', isDone: false },
            { id: v1(), title: 'Snacks', isDone: false },
        ]
    });

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = { id: v1(), title, filter: 'all' };
        setTodolists([ newTodolist, ...todolists ]);
        setTask({ ...tasks, [newTodolist.id]: [] });
    };

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId];
    };

    const changeTodolistFilter = (value: FilterType, todolistId: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ?
            { ...todolist, filter: value } : todolist));
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(
            todolist => todolist.id === todolistId ? { ...todolist, title } :
                        todolist));
    };

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = { id: v1(), title, isDone: false };
        setTask({ ...tasks, [todolistId]: [ newTask, ...tasks[todolistId] ] });
    };

    const deleteTask = (taskId: string, todolistId: string): void => {
        const updTasks = tasks[todolistId].filter(task => task.id !== taskId);
        setTask({ ...tasks, [todolistId]: updTasks });
    };

    const changeTaskStatus = (
        taskId: string, value: boolean, todolistId: string
    ) => {
        const updTasks = tasks[todolistId].map(
            task => task.id === taskId ? { ...task, isDone: value } : task);
        setTask({ ...tasks, [todolistId]: updTasks });
    };

    const changeTaskTitle = (
        taskId: string, title: string, todolistId: string
    ) => {
        const updTasks = tasks[todolistId].map(
            task => task.id === taskId ? { ...task, title } : task);
        setTask({ ...tasks, [todolistId]: updTasks });
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