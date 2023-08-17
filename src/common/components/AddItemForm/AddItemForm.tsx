import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

import { RejectValueType } from 'common/utils/createAppAsyncThunk/createAppAsyncThunk'

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled }: Props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const onAddItem = () => {
        if (title.trim() !== '') {
            addItem(title)
                .then(() => {
                    setTitle('')
                })
                .catch((err: RejectValueType) => {
                    if (err.data) {
                        const messages = err.data.messages
                        setError(messages.length ? messages[0] : 'Some error occurred')
                    }
                })
        } else {
            setError('Title is required')
        }
    }

    const onAddItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && onAddItem()
    }

    return (
        <StyledAddItemForm>
            <StyledInput
                value={title}
                onChange={onSetTitle}
                onKeyUp={onAddItemOnEnter}
                error={!!error}
                id="standard-basic"
                label={error ? error : 'Enter title'}
                variant="standard"
                size="small"
                disabled={disabled}
            />
            <IconButton color="primary" onClick={onAddItem} disabled={disabled}>
                <AddIcon />
            </IconButton>
        </StyledAddItemForm>
    )
})

const StyledAddItemForm = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const StyledInput = styled(TextField)`
    &.error {
        border: red 1px solid;
    }
`
