import { ChangeEvent, memo, useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
    title: string
    callback: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = memo(({ title, callback, disabled }: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        isEditMode && checkCorrectLengthTitle(localTitle.trim())
    }, [isEditMode, localTitle])

    const checkCorrectLengthTitle = (title: string) => {
        setError(title.length >= 100 ? 'Title must be less than 100 characters' : null)
    }

    const onToggleEditMode = () => {
        if (!localTitle.trim() || disabled || error) return
        isEditMode && callback(localTitle)
        setIsEditMode(!isEditMode)
    }

    const onSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return isEditMode ? (
        <InputWrapper>
            <StyledInput
                type="text"
                autoFocus
                onBlur={onToggleEditMode}
                onChange={onSetLocalTitle}
                value={localTitle}
                error={error ? error.toString() : undefined}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
    ) : (
        <span onDoubleClick={onToggleEditMode}>{localTitle}</span>
    )
})

// styles
const InputWrapper = styled.span`
    position: relative;
`
const StyledInput = styled.input<{ error?: string }>`
    outline: ${({ error }) => (error ? '1px solid indianred' : 'none')};
`
const ErrorMessage = styled.span`
    position: absolute;
    top: 20px;
    left: 0;
    font-size: 10px;
    color: indianred;
`
