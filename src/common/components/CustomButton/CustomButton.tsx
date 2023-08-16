import { memo } from 'react'
import Button from '@mui/material/Button'
import { ButtonProps } from '@mui/material/Button/Button'

export const CustomButton = memo(({ ...restProps }: ButtonProps) => {
    return <Button {...restProps}>{restProps.title}</Button>
})
