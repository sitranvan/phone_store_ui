import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import TitleManager from '../../../../../../components/Admin/TitleManager'
import Input from '../../../../../../components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createCategory } from '../../../../../../validation/category'
import { useMutation } from '@tanstack/react-query'
import categoryApi from '../../../../../../apis/category'
import { useNavigate } from 'react-router-dom'

export default function CreateCategory() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(createCategory)
    })

    const createCategoryMutation = useMutation({
        mutationFn: (body) => categoryApi.create(body),
        onSuccess: () => {
            navigate('/admin/category')
        }
    })

    const onSubmit = handleSubmit((data) => {
        createCategoryMutation.mutate(data)
    })
    return (
        <Box>
            <TitleManager>Thêm loại sản phẩm</TitleManager>
            <Box
                onSubmit={onSubmit}
                component='form'
                sx={{ backgroundColor: '#fff', pb: 8, py: 4, px: { xs: 1, md: 4 } }}
            >
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <Box>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Tên loại sản phẩm
                            </Typography>
                            <Input name='name' register={register} errors={errors} fullWidth size='small' />
                        </Box>
                    </Grid>
                </Grid>
                <Button type='submit' sx={{ width: '200px', mt: 2 }} variant='contained'>
                    Thêm loại sản phẩm
                </Button>
            </Box>
        </Box>
    )
}
