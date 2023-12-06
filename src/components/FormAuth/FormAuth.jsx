import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export default function FormAuth({ title, children, onSubmit }) {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '10px'
            }}
        >
            <Box
                component='form'
                onSubmit={onSubmit}
                sx={{
                    width: '400px'
                }}
            >
                <Typography
                    mb={4}
                    textAlign='center'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    gap='8px'
                    color='gray'
                    fontWeight='500'
                    variant='h3'
                    letterSpacing='2px'
                >
                    {title}
                    <Box
                        color='white'
                        sx={{
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'InactiveCaptionText'
                        }}
                    >
                        <LockOpenIcon fontSize='medium' />
                    </Box>
                </Typography>

                <Box>{children}</Box>
            </Box>
        </Container>
    )
}
