import { Box, Container, Divider, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import React from 'react'
import CategoryIcon from '@mui/icons-material/Category'
import PinterestIcon from '@mui/icons-material/Pinterest'
import Breadcrumb from '../../components/Breadcrumb'
import './styles.scss'
import ButtonCustom from '../../components/Button/ButtonCustom'
import Tabs from './modules/Tabs'
export default function Detail() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }))

    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumb />
            <Box sx={{ mt: 2 }}>
                <Grid direction='row' justifyContent='center' alignItems='center' container spacing={5}>
                    <Grid item md={6} xs={12}>
                        <div className='detail-img'>
                            <img
                                srcSet='https://media.wired.com/photos/63ee8e4fcde6e0e4f71293ef/master/pass/Samsung-Galaxy-S23-SOURCE-Samsung.jpg'
                                alt=''
                            />
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Item sx={{ textAlign: 'left' }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 26,
                                    color: '#1A2027',
                                    mb: 2,
                                    lineHeight: 1.5,
                                    letterSpacing: '0.02em'
                                }}
                            >
                                Samsung Galaxy S23 Ultra màu Tím Lilac (512GB)
                            </Typography>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: '28px', // Correct syntax without duplicate keys
                                        color: '#D70018',
                                        fontWeight: '600',
                                        height: '65px'
                                    }}
                                    variant='span'
                                >
                                    12.500.000đ
                                </Typography>
                                <Typography
                                    sx={{
                                        textDecoration: 'line-through',
                                        fontSize: '18px',
                                        ml: 1,
                                        color: '#707070',
                                        fontWeight: '600',
                                        height: '65px'
                                    }}
                                    variant='span'
                                >
                                    15.000.000đ
                                </Typography>
                            </Box>

                            <Divider sx={{ mt: 2 }} component='p' />
                            <Typography display='flex' color='gray' mt={2}>
                                <CategoryIcon />
                                <Typography component='span' display='flex' fontWeight='600' mt={0.5}>
                                    Danh Mục:{' '}
                                    <Typography ml={1} component='span' fontWeight='600' color='purple'>
                                        Android
                                    </Typography>
                                </Typography>
                            </Typography>

                            <Typography display='flex' color='gray' mt={1}>
                                <PinterestIcon />
                                <Typography component='span' display='flex' fontWeight='600' mt={0.5}>
                                    Thương hiệu:
                                    <Typography ml={1} component='span' fontWeight='600' color='purple'>
                                        Samsung
                                    </Typography>
                                </Typography>
                            </Typography>

                            <Typography mt={4} component='p'>
                                Số lượng
                            </Typography>
                            <Box>
                                <TextField defaultValue={1} sx={{ width: '150px' }} size='small' type='number' />
                            </Box>
                            <ButtonCustom color='primary' sx={{ mt: 3 }}>
                                Thêm vào giỏ hàng
                            </ButtonCustom>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                    mb: 2
                }}
            >
                <Tabs />
            </Box>
        </Container>
    )
}
