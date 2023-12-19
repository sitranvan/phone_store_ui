import { useContext, useEffect } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { FaRegUser } from 'react-icons/fa'
import { TfiDashboard } from 'react-icons/tfi'
import { TbCategoryMinus } from 'react-icons/tb'
import { NAV } from '../../../constants/config'
import { MdOutlinePhoneIphone } from 'react-icons/md'
import { usePathname } from '../../../hooks/usePathname'
import { useResponsive } from '../../../hooks/useResponsive'
import { TbBrandApple } from 'react-icons/tb'
import { IoMdPaperPlane } from 'react-icons/io'
import { FaShippingFast } from 'react-icons/fa'
import Logo from '../Logo'
import ScrollBar from '../ScrollBar'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../contexts/App'

const navConfig = [
    {
        title: 'Tổng quan',
        path: '/admin',
        icon: <TfiDashboard fontSize='20px' />
    },
    {
        title: 'Quản lý khách hàng',
        path: '/admin/user',
        icon: <FaRegUser fontSize='20px' />
    },
    {
        title: 'Quản lý sản phẩm',
        path: '/admin/product',
        icon: <MdOutlinePhoneIphone fontSize='20px' />
    },
    {
        title: 'Quản lý loại điện thoại',
        path: '/admin/category',
        icon: <TbCategoryMinus fontSize='20px' />
    },
    {
        title: 'Quản lý thương hiệu',
        path: '/admin/brand',
        icon: <TbBrandApple fontSize='20px' />
    },
    {
        title: 'Quản lý đơn hàng',
        path: '/admin/order',
        icon: <FaShippingFast fontSize='20px' />
    }
]

export default function Nav({ openNav, onCloseNav }) {
    const pathname = usePathname()
    const { profile } = useContext(AppContext)
    const upLg = useResponsive('up', 'lg')

    useEffect(() => {
        if (openNav) {
            onCloseNav()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const renderAccount = (
        <Box
            sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
            }}
        >
            <Avatar src={'none'} alt='photoURL' />

            <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle2'>{profile?.name}</Typography>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {profile?.role}
                    <Link to='/'>
                        <IoMdPaperPlane fontSize='20px' />
                    </Link>
                </Typography>
            </Box>
        </Box>
    )

    const renderMenu = (
        <Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
            {navConfig.map((item) => (
                <NavItem key={item.title} item={item} />
            ))}
        </Stack>
    )

    const renderContent = (
        <ScrollBar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            <Logo sx={{ mt: 3, ml: 4 }} />

            {renderAccount}

            {renderMenu}

            <Box sx={{ flexGrow: 1 }} />
        </ScrollBar>
    )

    return (
        <Box
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.WIDTH }
            }}
        >
            {upLg ? (
                <Box
                    sx={{
                        height: 1,
                        position: 'fixed',
                        width: NAV.WIDTH,
                        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`
                    }}
                >
                    {renderContent}
                </Box>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.WIDTH
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    )
}

// ----------------------------------------------------------------------

function NavItem({ item }) {
    const pathname = usePathname()

    const active = item.path === pathname

    return (
        <Link to={item.path}>
            <ListItemButton
                sx={{
                    minHeight: 44,
                    borderRadius: 0.75,
                    typography: 'body2',
                    color: 'text.secondary',
                    textTransform: 'capitalize',
                    fontWeight: 'fontWeightMedium',
                    ...(active && {
                        color: 'primary.main',
                        fontWeight: 'fontWeightSemiBold',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16)
                        }
                    })
                }}
            >
                <Box component='span' sx={{ width: 24, height: 24, mr: 2 }}>
                    {item.icon}
                </Box>

                <Box component='span'>{item.title} </Box>
            </ListItemButton>
        </Link>
    )
}
