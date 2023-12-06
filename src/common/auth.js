export const saveAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken') || ''
}

export const cleanAccessToken = () => {
    localStorage.removeItem('accessToken')
}

export const getProfile = () => JSON.parse(localStorage.getItem('profile'))

export const setProfile = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}

export const cleanProfile = () => {
    localStorage.removeItem('profile')
}
