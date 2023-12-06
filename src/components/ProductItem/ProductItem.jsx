import React from 'react'
import { Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import productDefault from '../../assets/images/productDefault.png'
import { formatCurrency } from '../../common'
import ProductRating from '../ProudctRating/ProductRating'
import './styles.scss'
export default function ProductItem({ img, name, price, promotionPrice, rating, numberOfReviews, sold }) {
    const photo = img ? img : productDefault
    return (
        <div className='grid-item'>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <img srcSet={photo} alt={name} width='100%' />
                </Box>
                <div className='wrap-name'>
                    <h6 className='product-name'>{name}</h6>
                </div>

                <Box>
                    <Typography fontSize='15px' color='#D70018' fontWeight='500' height='65px' variant='span'>
                        {promotionPrice !== null ? formatCurrency(promotionPrice) + '₫' : ''}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: promotionPrice === null ? '15px' : '12px',
                            color: promotionPrice === null ? '#000000CC' : '#707070',
                            ml: promotionPrice === null ? 0 : 1,
                            textDecoration: promotionPrice !== null ? 'line-through' : 'none'
                        }}
                        fontWeight='500'
                        height='65px'
                        variant='span'
                    >
                        {formatCurrency(price) + '₫'}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ProductRating rating={rating} />
                        <Typography sx={{ ml: '5px' }} fontSize='13px' component='span'>
                            {(!numberOfReviews.length ? '0' : numberOfReviews) + ' (lượt)'}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{ ml: '5px' }} fontSize='13px' component='span'>
                            Đã bán {sold}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    )
}