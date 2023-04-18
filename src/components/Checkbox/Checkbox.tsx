import { ChangeEvent } from 'react';

type CheckboxPropsType = {
    isDone: boolean
    callback: (changedIsDone: boolean) => void
}

const Checkbox = (props: CheckboxPropsType) => {
    const { isDone, callback } = props;
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    };

    return (
        <input type="checkbox"
               checked={ isDone }
               onChange={ (e) => onChangeHandler(e) } />
    );
};

export default Checkbox;