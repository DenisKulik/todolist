import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import { TodolistDomainType, todolistsThunks } from 'features/Todolists/todolists.reducer'
import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Todolist from './Todolist/Todolist'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import { useActions, useAppSelector } from 'common/hooks'
import { selectIsLoggedIn } from 'features/Login/model/auth.selectors'
import { selectTodolists } from 'features/Todolists/todolists.selectors'

export const Todolists = ({ demo = false }: TodolistsPropsType) => {
    const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn || demo) return
        fetchTodolists()
    }, [fetchTodolists, demo, isLoggedIn])

    const addTodolist = useCallback(
        (title: string) => {
            addTodolistThunk(title)
        },
        [addTodolistThunk],
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

    if (!isLoggedIn) return <Navigate to="/login" />

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

// styles
const StyledPaper = styled(Paper)`
    padding: 10px;
`

const StyledGrid = styled(Grid)`
    padding: 20px;
`

// types
type TodolistsPropsType = {
    demo?: boolean
}
