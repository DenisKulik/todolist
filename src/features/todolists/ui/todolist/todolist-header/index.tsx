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
            <StyledIconButton onClick={onDeleteTodolist} disabled={entityStatus === 'loading'}>
                <DeleteIcon />
            </StyledIconButton>
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
    max-width: 200px;
    margin: 0;
    word-wrap: break-word;
    overflow: hidden;
`
const StyledIconButton = styled(IconButton)`
    margin-left: auto !important;
`
