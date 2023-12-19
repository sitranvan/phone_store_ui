import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import GrainIcon from '@mui/icons-material/Grain'
import { Box } from '@mui/material'

function handleClick(event) {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
}

export default function Breadcrumb({ mt = '90px', page = '', title = '' }) {
    return (
        <Box sx={{ mt }} role='presentation' onClick={handleClick}>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' sx={{ display: 'flex', alignItems: 'center' }} color='inherit' href='/'>
                    <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                    Trang chủ
                </Link>
                <Link
                    underline='hover'
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color='inherit'
                    href='/material-ui/getting-started/installation/'
                >
                    <WhatshotIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                    {page}
                </Link>
                {title && (
                    <Typography sx={{ display: 'flex', alignItems: 'center' }} color='text.primary'>
                        <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                        {title}
                    </Typography>
                )}
            </Breadcrumbs>
        </Box>
    )
}
