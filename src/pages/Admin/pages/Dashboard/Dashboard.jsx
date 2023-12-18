import { Box, Button } from '@mui/material'
import React from 'react'

export default function Dashboard() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 10
            }}
        >
            <Button sx={{ fontSize: '30px', textTransform: 'uppercase' }} color='secondary'>
                Tổng Quan
            </Button>
        </Box>
    )
}
