import { ChangeEvent, memo, useState } from 'react';

type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

const EditableSpan = ({ title, callback }: EditableSpanType) => {
    const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
    const [ localTitle, setLocalTitle ] = useState<string>(title);

    const toggleEditMode = () => {
        if (!localTitle.trim()) return;
        isEditMode && callback(localTitle);
        setIsEditMode(!isEditMode);
    };

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value);
    };

    return (
        isEditMode ?
        <input
            type="text"
            autoFocus
            onBlur={toggleEditMode}
            onChange={setLocalTitleHandler}
            value={localTitle}
        /> :
        <span onDoubleClick={toggleEditMode}>{localTitle}</span>
    );
};

export default memo(EditableSpan);