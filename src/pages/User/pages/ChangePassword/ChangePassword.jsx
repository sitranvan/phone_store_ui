import React from 'react'
import { Box, Button, FormControl, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdPublishedWithChanges } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Input from '../../../../components/Input'
import { changePasswordSchema } from '../../../../validation/user'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../apis/user'
import { omit } from 'lodash'

export default function ChangePassword() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        resolver: yupResolver(changePasswordSchema)
    })
    const updatePasswordMutation = useMutation({
        mutationFn: (body) => userApi.updatePassword(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirmPassword'])
        updatePasswordMutation.mutate(body, {
            onSuccess: () => {
                navigate('')
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
        <Box onSubmit={onSubmit} component='form' sx={{ p: 4, backgroundColor: '#fff' }}>
            <Typography
                sx={{
                    textTransform: 'capitalize',
                    fontSize: '18px',
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
                component='p'
            >
                Thay đổi mật khẩu
                <MdPublishedWithChanges fontSize='28px' />
            </Typography>
            <Typography sx={{ fontSize: '15px', mb: 4 }} component='p'>
                Vui lòng nhập mật khẩu cũ và mật khẩu mới
            </Typography>
            <Box>
                <FormControl fullWidth>
                    <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                        Mật khẩu cũ
                    </Typography>
                    <Input name='oldPassword' register={register} errors={errors} />
                </FormControl>
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                        Mật khẩu mới
                    </Typography>
                    <Input name='newPassword' register={register} errors={errors} />
                </FormControl>
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                        Xác nhận mật khẩu
                    </Typography>
                    <Input name='confirmPassword' register={register} errors={errors} />
                </FormControl>
                <Button type='submit' sx={{ mt: 4, width: '150px' }} variant='contained'>
                    Xác nhận
                </Button>
            </Box>
        </Box>
    )
}
