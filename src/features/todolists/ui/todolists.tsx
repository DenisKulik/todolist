import {useEffect, useRef} from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'

import { TodolistDomainType, todolistsThunks } from 'features/todolists/model/todolists.slice'
import { Todolist } from 'features/todolists/ui/todolist'
import { AddItemForm } from 'common/components/add-Item-form'
import { useActions, useAppSelector, useScrollbar } from 'common/hooks'
import { selectIsLoggedIn } from 'features/login/model/auth.selectors'
import { selectTodolists } from 'features/todolists/model/todolists.selectors'

type Props = {
    demo?: boolean
}

export const Todolists = ({ demo = false }: Props) => {
    const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todoWrapper = useRef<HTMLDivElement>(null)
    const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistsThunks)

    useScrollbar(todoWrapper)

    useEffect(() => {
        if (!isLoggedIn || demo) return
        fetchTodolists()
        // eslint-disable-next-line
    }, [])

    const onAddTodolist = (title: string) => {
        return addTodolistThunk(title).unwrap()
    }

    const todolistsItems: JSX.Element[] = todolists.map(todolist => {
        return <Todolist key={todolist.id} todolist={todolist} />
    })

    if (!isLoggedIn) return <Navigate to="/login" />

    return (
        <>
            <StyledGridAddItemForm container>
                <AddItemForm addItem={onAddTodolist} />
            </StyledGridAddItemForm>
            <div ref={todoWrapper}>
                <StyledGridTodolists container spacing={3}>
                    {todolistsItems}
                </StyledGridTodolists>
            </div>
        </>
    )
}

// styles
const StyledGridAddItemForm = styled(Grid)`
    padding: 20px;
`

const StyledGridTodolists = styled(Grid)`
    min-height: 80vh;
    flex-wrap: nowrap !important;
`
