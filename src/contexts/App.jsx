import { createContext, useState } from 'react'
import { getAccessToken, getProfile } from '../common/auth'

const initAppContext = {
    // có token là true
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState(initAppContext.profile)

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
            {children}
        </AppContext.Provider>
    )
}
