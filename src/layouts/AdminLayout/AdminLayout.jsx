import React, { Fragment, useState } from 'react'
import Header from '../../components/Admin/Header'
import Main from '../../components/Admin/Main'
import Nav from '../../components/Admin/Nav'
import { Box } from '@mui/material'

export default function AdminLayout({ children }) {
    const [openNav, setOpenNav] = useState(false)

    return (
        <Fragment>
            <Header onOpenNav={() => setOpenNav(true)} />

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' }
                }}
            >
                <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

                <Main>{children}</Main>
            </Box>
        </Fragment>
    )
}
