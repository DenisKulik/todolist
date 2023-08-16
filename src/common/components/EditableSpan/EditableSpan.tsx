import { ChangeEvent, memo, useState } from 'react'

type Props = {
    title: string
    callback: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = memo(({ title, callback, disabled }: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const onToggleEditMode = () => {
        if (!localTitle.trim() || disabled) return
        isEditMode && callback(localTitle)
        setIsEditMode(!isEditMode)
    }

    const onSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return isEditMode ? (
        <input
            type="text"
            autoFocus
            onBlur={onToggleEditMode}
            onChange={onSetLocalTitle}
            value={localTitle}
        />
    ) : (
        <span onDoubleClick={onToggleEditMode}>{localTitle}</span>
    )
})
