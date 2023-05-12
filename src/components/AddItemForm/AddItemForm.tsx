import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

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
        <>
            <div className="AddItemForm">
                <Input
                    className={error ? 'error' : ''}
                    onChange={setTitleHandler}
                    onKeyUp={addItemOnEnterHandler}
                    value={title}
                    placeholder="Please, enter title"
                />
                <StyledButton
                    variant="outlined"
                    onClick={AddItemHandler}
                >
                    +
                </StyledButton>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
};

const StyledButton = styled(Button)`
  && {
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const Input = styled.input`
  &.error {
    border: red 1px solid;
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default AddItemForm;

