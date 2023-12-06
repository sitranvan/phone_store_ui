import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AdbIcon from '@mui/icons-material/Adb'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from '../../contexts/App'
import avatar from '../../assets/avatar.png'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../apis/user'

const pages = [
    {
        path: '/',
        title: 'Trang chủ'
    },
    {
        path: '/contact',
        title: 'Liên hệ'
    }
]

const settings = [
    {
        path: '/profile',
        title: 'Thông tin cá nhân'
    }
]

function Header() {
    const { isAuthenticated, setIsAuthenticated, profile, setProfile } = React.useContext(AppContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    // logout

    const logoutMutation = useMutation({
        mutationFn: userApi.logout,
        onSuccess: () => {
            setIsAuthenticated(false)
            setProfile(null)
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar color='error' position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='#app-bar-with-responsive-menu'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        STORE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                                    <Link style={{ color: '#fff', textDecoration: 'none' }} to={page.path}>
                                        {page.title}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href='#app-bar-with-responsive-menu'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link
                                    style={{ color: '#fff', textDecoration: 'none', textTransform: 'capitalize' }}
                                    to={page.path}
                                >
                                    {page.title}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {!isAuthenticated ? (
                            <NavLink
                                to='/login'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    color: '#fff',
                                    textDecoration: 'none'
                                }}
                            >
                                <AccountCircleIcon sx={{ mb: 0.5, mr: 0.5 }} fontSize='medium' />
                                Đăng Nhập
                            </NavLink>
                        ) : (
                            <Box>
                                <Tooltip title={profile.name}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt='Remy Sharp' src={avatar} />
                                        <img src='' alt='' />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id='menu-appbar'
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                                            <NavLink
                                                style={{ textDecoration: 'none', color: '#000000DE' }}
                                                to={setting.path}
                                            >
                                                {setting.title}
                                            </NavLink>
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={handleLogout}>
                                        <Typography>Đăng xuất</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header
