import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Avatar, Button, Container, Tooltip } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'
import { useContext } from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import userApi from '../../apis/user'
import { AppContext } from '../../contexts/App'
import SearchResult from './modules/SearchResult'
import { BASE_URL_IMAGE } from '../../constants'

export default function PrimarySearchAppBar() {
    const navigate = useNavigate()
    const { carts, isAuthenticated, profile, setIsAuthenticated } = useContext(AppContext)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const pages = [
        {
            title: 'Trang chủ',
            path: '/'
        },
        {
            title: 'Liên hệ',
            path: '/'
        },
        {
            title: 'Giới thiệu',
            path: '/'
        }
    ]

    const settings = [
        {
            title: 'Tài khoản của tôi',
            path: '/user/profile'
        },
        {
            title: 'Đơn hàng',
            path: 'user/order'
        }
    ]

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    // open cart
    const handleOpenCart = async () => {
        if (isAuthenticated) {
            navigate('/cart')
        } else {
            navigate('/login')
        }
    }

    // Logout
    const logoutMutation = useMutation({
        mutationFn: userApi.logout,
        onSuccess: () => {
            setIsAuthenticated(false)
        }
    })
    const handleLogout = () => {
        logoutMutation.mutate()

        handleCloseUserMenu()
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

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to='/user/profile'>
                <MenuItem onClick={handleMenuClose}>Thông tin cá nhân</MenuItem>
            </Link>
            <Link to='/user/order'>
                <MenuItem onClick={handleMenuClose}>Đơn hàng</MenuItem>
            </Link>
            <Link to='/user/password'>
                <MenuItem onClick={handleMenuClose}>Đổi mật khẩu</MenuItem>
            </Link>

            <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
        </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link to='/cart'>
                <MenuItem>
                    <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
                        <Badge badgeContent={isAuthenticated ? carts?.length || '0' : null} color='error'>
                            <BsFillCartCheckFill />
                        </Badge>
                    </IconButton>
                    <p>Giỏ hàng</p>
                </MenuItem>
            </Link>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'
                >
                    <AccountCircle />
                </IconButton>
                <p>Cài đặt tài khoản</p>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1, mb: { md: '75px', xs: '55px' } }}>
            <AppBar position='fixed'>
                <Container sx={{ p: 0 }}>
                    <Toolbar>
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
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                        <Link to={page.path}>
                                            <Typography textAlign='center'>{page.title}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            letterSpacing='2px'
                            variant='h4'
                            noWrap
                            component='div'
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            S&T
                        </Typography>
                        <SearchResult />
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Link key={page.title} to={page.path}>
                                    <Button
                                        key={page.title}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page.title}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px' }}>
                            <IconButton
                                onClick={handleOpenCart}
                                size='large'
                                aria-label='show 4 new mails'
                                color='inherit'
                            >
                                <Badge badgeContent={isAuthenticated ? carts?.length || '0' : null} color='error'>
                                    <BsFillCartCheckFill />
                                </Badge>
                            </IconButton>

                            {isAuthenticated ? (
                                <Box sx={{ flexGrow: 0, display: 'flex' }}>
                                    <Tooltip title={profile?.name}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt='Remy Sharp' src={BASE_URL_IMAGE + profile?.avatar} />
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
                                            <Link key={setting.title} to={setting.path}>
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Typography textAlign='center'>{setting.title}</Typography>
                                                </MenuItem>
                                            </Link>
                                        ))}
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign='center'>Đăng xuất</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                <Link style={{ display: 'flex', alignItems: 'center' }} to='/login'>
                                    <Typography component='p'>Chưa đăng nhập</Typography>
                                </Link>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                aria-label='show more'
                                aria-controls={mobileMenuId}
                                aria-haspopup='true'
                                onClick={handleMobileMenuOpen}
                                color='inherit'
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    )
}
