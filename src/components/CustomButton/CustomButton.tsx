import React, { memo } from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button/Button';

const CustomButton = ({ ...restProps }: ButtonProps) => {
    return (
        <Button{...restProps}>
            {restProps.title}
        </Button>
    );
};

export default memo(CustomButton);