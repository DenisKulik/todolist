import { memo, useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import {
    TodolistDomainType,
    todolistsThunks,
} from 'features/todolists-list/todolists/model/todolists.slice'
import { Todolist } from 'features/todolists-list/todolists/ui/Todolist/Todolist'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { useActions, useAppSelector } from 'common/hooks'
import { selectIsLoggedIn } from 'features/login/model/auth.selectors'
import { selectTodolists } from 'features/todolists-list/todolists/model/todolists.selectors'

type Props = {
    demo?: boolean
}

export const Todolists = memo(({ demo = false }: Props) => {
    const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn || demo) return
        fetchTodolists()
    }, [fetchTodolists, demo, isLoggedIn])

    const onAddTodolist = useCallback(
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
                <AddItemForm addItem={onAddTodolist} />
            </StyledGrid>
            <Grid container spacing={3}>
                {todolistsItems}
            </Grid>
        </>
    )
})

// styles
const StyledPaper = styled(Paper)`
    padding: 10px;
`

const StyledGrid = styled(Grid)`
    padding: 20px;
`
