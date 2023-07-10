import { ChangeEvent } from 'react';
import Checkbox from '@mui/material/Checkbox';

type CustomCheckboxPropsType = {
    checked: boolean
    callback: (checked: boolean) => void
    disabled?: boolean
}

const CustomCheckbox = (props: CustomCheckboxPropsType) => {
    const { checked, callback, disabled } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        callback(e.currentTarget.checked);

    return (
        <Checkbox
            checked={checked}
            color="success"
            size="small"
            onChange={onChangeHandler}
            disabled={disabled}
        />
    );
};

export default CustomCheckbox;