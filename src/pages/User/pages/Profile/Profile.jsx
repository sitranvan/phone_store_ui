import { Avatar, Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import userApi from '../../../../apis/user'
import { BASE_URL_IMAGE } from '../../../../constants'
import { AppContext } from '../../../../contexts/App'

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

export default function Profile() {
    const { setProfile } = useContext(AppContext)
    const [file, setFile] = useState()
    const previewImage = useMemo(() => {
        return file ? URL.createObjectURL(file) : ''
    }, [file])
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            province: '',
            district: '',
            village: '',
            shortDescription: ''
        }
    })

    const { data: profileData } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userApi.getMe()
    })

    const profile = profileData?.data?.profile
    useEffect(() => {
        setValue('name', profile?.name || '')
        setValue('email', profile?.email)
        setValue('phone', profile?.address[0]?.phone || '')
        setValue('shortDescription', profile?.address[0]?.shortDescription || '')
        setValue('province', profile?.address[0]?.province)
        setValue('district', profile?.address[0]?.district)
        setValue('village', profile?.address[0]?.village)
    }, [profile, setValue])

    const udpateMeMutation = useMutation({
        mutationFn: (body) => userApi.update(body)
    })

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('phone', data.phone)
        formData.append('province', data.province)
        formData.append('district', data.district)
        formData.append('village', data.village)
        formData.append('shortDescription', data.shortDescription)
        formData.append('avatar', file) // Thêm dòng này để gửi tệp tin

        try {
            udpateMeMutation.mutate(formData)
            const profileInfo = {
                name: data.name,
                email: '',
                avatar: profile?.avatar || previewImage
            }
            setProfile(profileInfo)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    })

    const onFileChange = (e) => {
        const fileFromLocal = e.target.files?.[0]
        setFile(fileFromLocal)
    }

    return (
        <Box onSubmit={onSubmit} component='form' method='POST'>
            <Grid alignItems='center' sx={{ backgroundColor: '#fff', pb: 4 }} container spacing={3}>
                <Grid order={{ xs: 2, md: 1 }} item xs={12} md={7.5}>
                    <Box sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}>
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
                            Thông tin cá nhân
                            <CgProfile fontSize='28px' />
                        </Typography>
                        <Typography sx={{ fontSize: '15px' }} component='p'>
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </Typography>
                    </Box>
                    <Box>
                        <Box>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Họ tên
                            </Typography>
                            <TextField {...register('name')} fullWidth size='small' />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Email
                            </Typography>
                            <TextField
                                {...register('email')}
                                disabled
                                inputProps={{ readOnly: true }}
                                fullWidth
                                size='small'
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Số điện thoại
                            </Typography>
                            <TextField {...register('phone')} type='phone' fullWidth size='small' />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                Địa chỉ
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                        Tỉnh thành
                                    </Typography>
                                    <TextField {...register('province')} type='text' fullWidth size='small' />
                                </FormControl>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                        Quận huyện
                                    </Typography>
                                    <TextField {...register('district')} type='text' fullWidth size='small' />
                                </FormControl>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: '5px' }} component='p'>
                                        Phường xã
                                    </Typography>
                                    <TextField {...register('village')} type='text' fullWidth size='small' />
                                </FormControl>
                            </Box>
                        </Box>
                        <Typography sx={{ fontSize: '15px', color: '#555555CC', mb: 1, mt: 2 }} component='p'>
                            Số nhà, tên đường...
                        </Typography>
                        <div className='textarea-custom'>
                            <textarea {...register('shortDescription')} rows={3} id='note' sx={{ mb: 3 }} />
                        </div>
                    </Box>
                    <Button type='submit' sx={{ mt: 5, width: '150px' }} variant='contained'>
                        Lưu
                    </Button>
                </Grid>
                <Grid order={{ xs: 1, md: 2 }} item xs={12} md={4.5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Avatar
                            alt='Remy Sharp'
                            src={BASE_URL_IMAGE + profile?.avatar || previewImage}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Button sx={{ mt: 2 }} component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                            Chọn ảnh
                            <VisuallyHiddenInput onChange={onFileChange} accept='image/*' type='file' />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
