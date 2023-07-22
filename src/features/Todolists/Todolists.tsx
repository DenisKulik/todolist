import { Navigate } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import { useAppDispatch, useAppSelector } from 'app/store'
import { createTodolistTC, getTodolistsTC, TodolistDomainType } from './todolistsReducer'
import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Todolist from './Todolist/Todolist'
import AddItemForm from '../../components/AddItemForm/AddItemForm'
import styled from 'styled-components'
import { selectIsLoggedIn } from 'features/Login/auth.selectors'
import { selectTodolists } from 'features/Todolists/todolists.selectors'

type TodolistsPropsType = {
    demo?: boolean
}

export const Todolists = ({ demo = false }: TodolistsPropsType) => {
    const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn || demo) return
        dispatch(getTodolistsTC())
    }, [dispatch, demo, isLoggedIn])

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(createTodolistTC(title))
        },
        [dispatch],
    )

    const todolistsItems: JSX.Element[] = todolists.map(todolist => {
        return (
            <Grid item key={todolist.id}>
                <StyledPaper elevation={3}>
                    <Todolist todolist={todolist} />
                </StyledPaper>
            </Grid>
        )
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <StyledGrid container>
                <AddItemForm addItem={addTodolist} />
            </StyledGrid>
            <Grid container spacing={3}>
                {todolistsItems}
            </Grid>
        </>
    )
}

const StyledPaper = styled(Paper)`
    padding: 10px;
`

const StyledGrid = styled(Grid)`
    padding: 20px;
`
