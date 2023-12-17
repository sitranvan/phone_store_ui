import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../../apis/auth'
import ButtonCustom from '../../components/Button'
import FormAuth from '../../components/FormAuth'
import Input from '../../components/Input'
import InputPassword from '../../components/InputPassword'
import { registerSchema } from '../../validation/auth'

function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const registerMutation = useMutation({
        mutationFn: (body) => authApi.register(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirmPassword'])
        registerMutation.mutate(body, {
            onSuccess: () => {
                navigate('/login')
            },
            onError: (error) => {
                if (error.response?.status == 400) {
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
            }
        })
    })
    return (
        <FormAuth onSubmit={onSubmit} title='Đăng Ký'>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}
                >
                    <Input name='name' register={register} errors={errors} label='Họ Tên' />
                    <Input name='email' register={register} errors={errors} label='Email' />
                    <InputPassword name='password' register={register} errors={errors} label='Mật khẩu' />
                    <InputPassword
                        name='confirmPassword'
                        register={register}
                        errors={errors}
                        label='Nhập Lại Mật Khẩu'
                    />
                </Box>
                <ButtonCustom type='submit' fullWidth sx={{ mt: 2 }}>
                    Đăng ký
                </ButtonCustom>
                <Typography mt={3}>
                    Bạn đã có tài khoản?
                    <Link to='/login'> Đăng Nhập Ngay</Link>
                </Typography>
            </Box>
        </FormAuth>
    )
}

export default Register
