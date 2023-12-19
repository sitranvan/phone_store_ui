import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TitleManager from '../../../../../../components/Admin/TitleManager'
import Input from '../../../../../../components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createCategory } from '../../../../../../validation/category'
import { useMutation, useQuery } from '@tanstack/react-query'
import categoryApi from '../../../../../../apis/category'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCategory() {
    const navigate = useNavigate()
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(createCategory)
    })

    const { data: categoryData } = useQuery({
        query: ['category'],
        queryFn: () => categoryApi.getCategory(id)
    })
    const category = categoryData?.data
    useEffect(() => {
        setValue('name', category?.name)
    }, [category])
    const updateCategoryMutation = useMutation({
        mutationFn: (mutationPayload) => categoryApi.update(mutationPayload.id, mutationPayload.body),
        onSuccess: (data) => {
            navigate('/admin/category')
        }
    })

    const onSubmit = handleSubmit((data) => {
        updateCategoryMutation.mutate({ id, body: data })
    })
    return (
        <Box>
            <TitleManager>Sửa loại sản phẩm</TitleManager>
            <Box
                onSubmit={onSubmit}
                component='form'
                sx={{ backgroundColor: '#fff', pb: 8, py: 4, px: { xs: 1, md: 4 } }}
            >
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <Box>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Tên sản phẩm
                            </Typography>
                            <Input name='name' register={register} errors={errors} fullWidth size='small' />
                        </Box>
                    </Grid>
                </Grid>
                <Button type='submit' sx={{ mt: 2 }} variant='contained'>
                    Cập nhật loại sản phẩm
                </Button>
            </Box>
        </Box>
    )
}
