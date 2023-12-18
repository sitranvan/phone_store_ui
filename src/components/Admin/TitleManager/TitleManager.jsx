import { Box, Typography } from '@mui/material'
import React from 'react'
import { GrUserAdmin } from 'react-icons/gr'

export default function TitleManager({ children }) {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                px: 4,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'gray',
                mb: 2
            }}
        >
            <Typography fontSize='24px'>{children}</Typography>
            <GrUserAdmin fontSize='22px' />
        </Box>
    )
}
