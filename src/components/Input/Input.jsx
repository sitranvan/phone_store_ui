import { TextField, colors } from '@mui/material'
import React from 'react'

export default function Input({ register = '', errors = '', name = '', label = '', color = 'success', ...rest }) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false

    return (
        <TextField
            {...registerResult}
            error={errorResult}
            helperText={errors[name]?.message}
            color={color}
            label={label}
            {...rest}
        />
    )
}
