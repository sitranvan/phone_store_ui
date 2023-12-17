import { Container, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
    return (
        <Container>
            <Grid sx={{ mt: '100px' }} container spacing={2}>
                <Grid item xs={12} md={3}>
                    <UserSideNav />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}
