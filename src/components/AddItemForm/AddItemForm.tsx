import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = ({ addItem }: AddItemFormType) => {
    const [ title, setTitle ] = useState<string>('');
    const [ error, setError ] = useState<string | null>(null);

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    };

    const AddItemHandler = () => {
        if (title.trim() === '') {
            setError('Field is required');
            return;
        }

        addItem(title);
        setTitle('');
    };

    const addItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && AddItemHandler();
    };

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
            />
            <StyledButton
                variant="outlined"
                onClick={AddItemHandler}
            >
                +
            </StyledButton>
        </StyledAddItemForm>
    );
};

const StyledAddItemForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  && {
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const StyledInput = styled(TextField)`
  &.error {
    border: red 1px solid;
  }
`;

export default AddItemForm;

