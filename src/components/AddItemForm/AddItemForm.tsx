import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

const AddItemForm = ({ addItem, disabled }: AddItemFormType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const AddItemHandler = () => {
        if (title.trim() === '') {
            setError('Field is required')
            return
        }

        addItem(title)
        setTitle('')
    }

    const addItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && AddItemHandler()
    }

    return (
        <StyledAddItemForm>
            <StyledInput
                value={title}
                onChange={setTitleHandler}
                onKeyUp={addItemOnEnterHandler}
                error={!!error}
                id="standard-basic"
                label={error ? 'Title is required' : 'Enter title'}
                variant="standard"
                size="small"
                disabled={disabled}
            />
            <IconButton color="primary" onClick={AddItemHandler} disabled={disabled}>
                <AddIcon />
            </IconButton>
        </StyledAddItemForm>
    )
}

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

export default memo(AddItemForm)
