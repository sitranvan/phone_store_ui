import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from '../contexts/App'
import MainLayout from '../layouts/MainLayout'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetail from '../pages/ProductDetail'
import Register from '../pages/Register'

function ProtectedRouter() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRouter() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function routerElements() {
    const routerElements = useRoutes([
        {
            path: '/',
            element: (
                <MainLayout>
                    <Home />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <RejectedRouter />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                }
            ]
        },
        {
            path: '',
            element: <ProtectedRouter />,
            children: [
                {
                    path: 'cart',
                    element: <Cart />
                },
                {
                    path: '/:nameId',
                    element: <ProductDetail />
                }
            ]
        }
    ])
    return routerElements
}
