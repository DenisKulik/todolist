import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import { TodolistDomainType, todolistsThunks } from './todolistsReducer'
import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Todolist from './Todolist/Todolist'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
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
        dispatch(todolistsThunks.fetchTodolists({}))
    }, [dispatch, demo, isLoggedIn])

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(todolistsThunks.addTodolist(title))
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
