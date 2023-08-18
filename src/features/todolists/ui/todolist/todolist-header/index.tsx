import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import { EditableSpan } from 'common/components/editable-span'
import { useActions } from 'common/hooks'
import { todolistsThunks } from 'features/todolists/model/todolists.slice'
import { RequestStatusType } from 'app/model/app.slice'

type Props = {
    todolistId: string
    title: string
    entityStatus: RequestStatusType
}

export const TodolistHeader = ({ todolistId, title, entityStatus }: Props) => {
    const { deleteTodolist, updateTodolistTitle } = useActions(todolistsThunks)

    const onChangeTodolistTitle = (title: string) => {
        updateTodolistTitle({ todolistId, title })
    }
    const onDeleteTodolist = () => {
        deleteTodolist(todolistId)
    }

    return (
        <Header>
            <Title>
                <EditableSpan
                    title={title}
                    callback={onChangeTodolistTitle}
                    disabled={entityStatus === 'loading'}
                />
            </Title>
            <IconButton onClick={onDeleteTodolist} disabled={entityStatus === 'loading'}>
                <DeleteIcon />
            </IconButton>
        </Header>
    )
}

// styles
const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Title = styled.h3`
    margin: 0;
`
