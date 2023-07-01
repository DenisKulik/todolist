import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AppRootStateType, useAppDispatch } from './state/store';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import {
    addTodolistAC, getTodolistsTC, TodolistDomainType
} from './state/todolistsReducer';
import Todolist from './components/Todolist/Todolist';

const App = () => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(
        state => state.todolists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [ dispatch ]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [ dispatch ]);

    const todolistsItems: JSX.Element[] = todolists.map(todolist => {
        return (
            <Grid item key={todolist.id}>
                <StyledPaper elevation={3}>
                    <Todolist
                        todolistId={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
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