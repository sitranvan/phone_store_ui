import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Button, FormControl, FormHelperText, Grid, MenuItem, Select, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../../../../../../apis/product'
import Editor from '../../../../../../components/Admin/Editor/Editor'
import TitleManager from '../../../../../../components/Admin/TitleManager'
import Input from '../../../../../../components/Input'
import categoryApi from '../../../../../../apis/category'
import brandApi from '../../../../../../apis/brand'
import { BASE_URL_IMAGE } from '../../../../../../constants/index'

export default function UpdateProduct() {
    const navigate = useNavigate()
    const [categoryId, setCategoryId] = useState()
    const [brandId, setBranId] = useState()
    const [photo, setPhoto] = useState('')
    const previewImage = useMemo(() => {
        return photo ? URL.createObjectURL(photo) : ''
    }, [photo])
    const [description, setDescription] = useState('')
    const [specification, setSpecification] = useState('')
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            price: '',
            promotionPrice: '',
            brandId: '',
            categoryId: ''
        }
    })
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

    const { id } = useParams()

    const { data: productData } = useQuery({
        query: ['product', id],
        queryFn: () => productApi.getProductDetal(id)
    })
    const product = productData?.data.product
    const handleChangePhoto = (e) => {
        const fileFromLocal = e.target.files?.[0]
        setPhoto(fileFromLocal)
    }

    useEffect(() => {
        setValue('name', product?.name)
        setValue('price', product?.price)
        setValue('promotionPrice', product?.promotionPrice)
        setValue('categoryId', product?.categoryId)
        setValue('brandId', product?.brandId)
    }, [product])

    const updateProductMutation = useMutation({
        mutationFn: (mutationPayload) => productApi.updateProduct(mutationPayload.id, mutationPayload.body),
        onSuccess: (data) => {
            navigate('/admin/product')
        }
    })

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('promotionPrice', data.promotionPrice)
        formData.append('description', description)
        formData.append('specification', specification)
        formData.append('brandId', data.brandId)
        formData.append('categoryId', data.categoryId)
        formData.append('photo', photo)

        updateProductMutation.mutate({ id, body: formData })
    })

    return (
        <Box>
            <TitleManager>Cập nhật sản phẩm</TitleManager>
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
                            <Editor
                                initialContent={product?.description}
                                onContentChange={(value) => setDescription(value)}
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Thông số kỹ thuật
                            </Typography>
                            <Editor
                                initialContent={product?.specification}
                                onContentChange={(value) => setSpecification(value)}
                            />
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
                                                <MenuItem
                                                    selected={category.id === product.categoryId}
                                                    value={category.id}
                                                    key={category.id}
                                                >
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
                                                <MenuItem
                                                    selected={brand.id === product.brandId} // Assuming product has a brandId property
                                                    value={brand.id}
                                                    key={brand.id}
                                                >
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
                            {previewImage ? (
                                <img
                                    style={{ borderRadius: '5px' }}
                                    width='200'
                                    src={previewImage}
                                    alt='product-image'
                                />
                            ) : (
                                <img
                                    style={{ borderRadius: '5px' }}
                                    width='200'
                                    src={
                                        product?.photo.startsWith('http://') || product?.photo.startsWith('https://')
                                            ? product?.photo
                                            : BASE_URL_IMAGE + product?.photo
                                    }
                                    alt='product-image'
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Button type='submit' sx={{ width: '200px', mt: 2 }} variant='contained'>
                    Cập nhật sản phẩm
                </Button>
            </Box>
        </Box>
    )
}
