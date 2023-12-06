import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function PaymentTitle({ title, price }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Typography fontSize='14px' color='GrayText' component='span'>
                {title}
            </Typography>
            <Typography color='teal' component='span'>
                {price}
            </Typography>
        </Box>
    )
}
