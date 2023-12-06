import React from 'react'
import { Card, Typography, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function TotalStar() {
    return (
        <Card sx={{ width: '200px', my: 3, textAlign: 'center', p: 1 }}>
            <Typography textTransform='uppercase' component='div' color='ThreeDHighlight' fontWeight='600' variant='h6'>
                Tổng Đánh Giá
            </Typography>
            <Box sx={{ display: 'flex', mt: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Typography component='div' fontWeight='700' color='GrayText' variant='h3'>
                    5
                </Typography>
                <StarIcon fontSize='large' color='warning' />
            </Box>
            <Typography component='div' fontWeight='500'>
                18 lượt
            </Typography>
        </Card>
    )
}
