import { Avatar, Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import userApi from '../../../../apis/user'
import { BASE_URL_IMAGE } from '../../../../constants'
import './styles.scss'
import { AppContext } from '../../../../contexts/App'

const infoAccount = [
    {
        title: 'Hồ sơ',
        path: '/user/profile'
    },
    {
        title: 'Thay đổi mật khẩu',
        path: '/user/password'
    },
    {
        title: 'Đơn hàng của tôi',
        path: '/user/order'
    }
]

export default function UserSideNav() {
    const { profile } = useContext(AppContext)
    return (
        <div className='nav-wrap'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Avatar
                    alt='Remy Sharp'
                    src={BASE_URL_IMAGE + profile?.avatar || 'avatar'}
                    sx={{ width: 40, height: 40 }}
                />
                <Typography fontStyle='500' component='p'>
                    {profile?.name || 'Người dùng'}
                </Typography>
            </Box>
            <h4>
                <FaRegUser />
                <span>Tài khoản của tôi</span>
            </h4>
            <ul>
                {infoAccount &&
                    infoAccount.map((item) => (
                        <li key={item.title}>
                            <NavLink style={{ width: '100%' }} className='link-account' to={item.path}>
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
