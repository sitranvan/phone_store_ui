import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import ButtonCustom from '../../components/Button'
import FormAuth from '../../components/FormAuth'
import Input from '../../components/Input'
import { loginSchema } from '../../validation/auth'
import InputPassword from '../../components/InputPassword'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '../../contexts/App'
import authApi from '../../apis/auth'

function Login() {
    const navigate = useNavigate()
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (body) => authApi.login(body)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                const { user } = data.data
                setIsAuthenticated(true)
                setProfile(user)
                if (user.role == 'customer') {
                    navigate('/')
                } else {
                    navigate('/admin')
                }
            },
            onError: (error) => {
                const formError = error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key, {
                            type: 'manual',
                            message: formError[key]
                        })
                    })
                }
            }
        })
    })
    return (
        <FormAuth onSubmit={onSubmit} title='Đăng Nhập'>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}
                >
                    <Input name='email' register={register} errors={errors} label='Email' />
                    <InputPassword name='password' register={register} errors={errors} label='Mật khẩu' />
                </Box>
                <ButtonCustom type='submit' fullWidth sx={{ mt: 2 }}>
                    Đăng nhập
                </ButtonCustom>
                <Typography mt={3}>
                    Bạn chưa có tài khoản?
                    <Link to='/register'> Đăng Ký Ngay</Link>
                </Typography>
            </Box>
        </FormAuth>
    )
}

export default Login
