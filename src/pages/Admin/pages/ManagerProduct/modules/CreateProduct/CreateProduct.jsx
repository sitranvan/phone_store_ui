import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, FormControl, Button, Grid, MenuItem, Select, TextField, Typography, FormHelperText } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useMemo, useState } from 'react'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import Input from '../../../../../../components/Input'
import TitleManager from '../../../../../../components/Admin/TitleManager'
import Editor from '../../../../../../components/Admin/Editor/Editor'
import categoryApi from '../../../../../../apis/category'
import brandApi from '../../../../../../apis/brand'
import { yupResolver } from '@hookform/resolvers/yup'
import { createProductSchema } from '../../../../../../validation/product'
import productApi from '../../../../../../apis/product'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
})
export default function CreateProduct() {
    const [categoryId, setCategoryId] = useState()
    const navigate = useNavigate()
    const [brandId, setBranId] = useState()
    const [photo, setPhoto] = useState('')
    const previewImage = useMemo(() => {
        return photo ? URL.createObjectURL(photo) : ''
    }, [photo])
    const [description, setDescription] = useState('')
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            price: '',
            promotionPrice: '',
            brandId: '',
            categoryId: ''
        },
        resolver: yupResolver(createProductSchema)
    })
    // Get categories
    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return categoryApi.getAllCategory()
        }
    })
    const categories = categoriesData?.data || []

    // Get brands
    const { data: brandsData } = useQuery({
        queryKey: ['brands'],
        queryFn: () => {
            return brandApi.getAllBrand()
        }
    })
    const brands = brandsData?.data || []

    const handleChangePhoto = (e) => {
        const fileFromLocal = e.target.files?.[0]
        setPhoto(fileFromLocal)
    }

    const createProductMutation = useMutation({
        mutationFn: (body) => productApi.createProduct(body),
        onSuccess: (data) => {
            navigate('/admin/product')
        }
    })

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('promotionPrice', data.promotionPrice)
        formData.append('brandId', data.brandId)
        formData.append('description', description)
        formData.append('categoryId', data.categoryId)
        formData.append('photo', photo)

        createProductMutation.mutate(formData, {
            onError: (error) => {
                if (error.response?.status == 500) {
                    const fileError = error.response?.data.message
                    toast.error(fileError)
                }
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
        <Box>
            <TitleManager>Thêm sản phẩm</TitleManager>
            <Box onSubmit={onSubmit} component='form' sx={{ backgroundColor: '#fff', pb: 8, px: { xs: 1, md: 4 } }}>
                <Grid container spacing={5}>
                    <Grid item md={6} xs={12}>
                        <Box>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Tên sản phẩm
                            </Typography>
                            <Input name='name' register={register} errors={errors} fullWidth size='small' />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Giá tiền
                            </Typography>
                            <Input
                                type='number'
                                name='price'
                                register={register}
                                errors={errors}
                                fullWidth
                                size='small'
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Giá khuyến mãi (nếu có)
                            </Typography>
                            <Input
                                type='number'
                                name='promotionPrice'
                                register={register}
                                errors={errors}
                                fullWidth
                                size='small'
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Mô tả sản phẩm
                            </Typography>
                            <Editor onContentChange={(value) => setDescription(value)} />
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Loại điện thoại
                            </Typography>

                            <Controller
                                name='categoryId'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        size='small'
                                        error={Boolean(errors.categoryId?.message)}
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                    >
                                        {categories &&
                                            categories.map((category) => (
                                                <MenuItem value={category.id} key={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText error={!!categoryId?.message}>{errors.categoryId?.message}</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Thương hiệu
                            </Typography>

                            <Controller
                                name='brandId'
                                control={control}
                                defaultValue={''}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        size='small'
                                        error={Boolean(errors.brandId?.message)}
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                    >
                                        {brands &&
                                            brands.map((brand) => (
                                                <MenuItem value={brand.id} key={brand.id}>
                                                    {brand.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText error={!!errors.brandId?.message}>{errors.brandId?.message}</FormHelperText>
                        </FormControl>

                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Hỉnh ảnh
                            </Typography>
                            <Button
                                sx={{ width: '200px', py: 1 }}
                                component='label'
                                variant='outlined'
                                color='success'
                                startIcon={<CloudUploadIcon />}
                            >
                                Chọn file
                                <VisuallyHiddenInput onChange={handleChangePhoto} accept='image/*' type='file' />
                            </Button>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            {previewImage && (
                                <img
                                    style={{ borderRadius: '5px' }}
                                    width='200'
                                    src={previewImage}
                                    alt='product-image'
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Button type='submit' sx={{ width: '200px', mt: 2 }} variant='contained'>
                    Thêm sản phẩm
                </Button>
            </Box>
        </Box>
    )
}
