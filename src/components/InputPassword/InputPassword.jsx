import { LocationDisabledRounded } from '@mui/icons-material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormHelperText, OutlinedInput } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import React, { useState } from 'react'

export default function InputPassword({ register, name, errors, color = 'success', label, ...rest }) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <FormControl error={errorResult} fullWidth variant='outlined'>
            <InputLabel color={color} htmlFor={`input-${name}`}>
                {label}
            </InputLabel>
            <OutlinedInput
                color={color}
                id={`input-${name}`}
                type={showPassword ? 'text' : 'password'}
                {...registerResult}
                {...rest}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            <FormHelperText id='password-helper-text'>{errors[name]?.message}</FormHelperText>
        </FormControl>
    )
}
