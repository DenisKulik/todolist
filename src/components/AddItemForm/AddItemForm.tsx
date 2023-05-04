import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './AddItemForm.module.scss';
import Button from '../Button/Button';

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
                <input
                    className={error ? styles.error : ''}
                    onChange={setTitleHandler}
                    onKeyUp={addItemOnEnterHandler}
                    value={title}
                    placeholder="Please, enter title"
                />
                <Button name={'+'} callback={AddItemHandler} />
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </>
    );
};

export default AddItemForm;

