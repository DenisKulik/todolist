import { useSelector } from 'react-redux';
import {
    AppRootStateType, useAppDispatch, useAppSelector
} from '../../app/store';
import {
    createTodolistsTC, getTodolistsTC, TodolistDomainType
} from './todolistsReducer';
import { useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Todolist from './Todolist/Todolist';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

export const Todolists = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(
        state => state.todolists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [ dispatch ]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistsTC(title));
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
        <>
            <StyledGrid container>
                <AddItemForm addItem={addTodolist} />
            </StyledGrid>
            <Grid container spacing={3}>
                {todolistsItems}
            </Grid>
        </>
    );
};

const StyledPaper = styled(Paper)`
  padding: 10px;
`;

const StyledGrid = styled(Grid)`
  padding: 20px;
`;