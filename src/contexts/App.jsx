import { useQuery } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import cartApi from '../apis/cart'
import { getAccessToken, getProfile } from '../common/auth'

export const AppContext = createContext()

const initAppContext = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null,
    carts: [],
    setCarts: () => null
}

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState(initAppContext.profile)
    const [carts, setCarts] = useState(initAppContext.carts)
    const { data: cartData, refetch } = useQuery({
        queryKey: ['carts'],
        queryFn: () => cartApi.getCart(),
        enabled: isAuthenticated
    })

    useEffect(() => {
        setCarts(cartData?.data)
        // refetch
    }, [cartData])

    // handle function refetch
    const handleRefetchCart = async () => {
        try {
            await refetch()
        } catch (err) {
            console.log(err)
        }
    }

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        carts,
        setCarts,
        handleRefetchCart
    }

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
