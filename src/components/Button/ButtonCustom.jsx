import React from 'react'
import { Button } from '@mui/material'
export default function ButtonCustom({
    children,
    type = 'button',
    size = 'large',
    color = 'primary',
    variant = 'contained',
    sx,
    ...rest
}) {
    return (
        <Button sx={sx} type={type} size={size} color={color} variant={variant} {...rest}>
            {children}
        </Button>
    )
}
