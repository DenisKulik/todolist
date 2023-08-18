import { ChangeEvent, memo } from 'react'
import Checkbox from '@mui/material/Checkbox'

type Props = {
    checked: boolean
    callback: (checked: boolean) => void
    disabled?: boolean
}

export const CustomCheckbox = memo(({ checked, callback, disabled }: Props) => {
    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }

    return (
        <Checkbox
            checked={checked}
            color="success"
            size="small"
            onChange={onChangeChecked}
            disabled={disabled}
        />
    )
})
