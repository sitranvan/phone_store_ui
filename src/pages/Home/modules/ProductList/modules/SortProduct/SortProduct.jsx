import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { omit } from 'lodash'
import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import MyButton from '../../../../../../components/MyButton'
export default function SortProduct({ queryConfig }) {
    const { sort_by = 'createdAt', order } = queryConfig
    const navigate = useNavigate()
    const isActiveSortBy = (sortByValue) => {
        return sort_by === sortByValue
    }

    const handleChangeSortBy = (sortByValue) => {
        navigate({
            pathname: '/',
            // loại bỏ order vì khi bấm vào chọn giá và bấm lại button thì sẽ lấy order của giá (desc, asc)
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue
                    },
                    ['order']
                )
            ).toString()
        })
    }

    const theme = useTheme()
    const handlePriceOrder = (orderValue) => {
        navigate({
            pathname: '/',
            search: createSearchParams({
                ...queryConfig,
                sort_by: 'price',
                order: orderValue
            }).toString()
        })
    }
    return (
        <Box
            sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: '8px',
                backgroundColor: '#EDEDED',
                [theme.breakpoints.down('md')]: {
                    justifyContent: 'space-between'
                }
            }}
        >
            <Typography
                sx={{
                    whiteSpace: 'nowrap',
                    mr: 5,
                    [theme.breakpoints.down('md')]: {
                        display: 'none'
                    }
                }}
                component='p'
            >
                Sắp xếp theo
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                <MyButton
                    onClick={() => handleChangeSortBy('createdAt')}
                    width='150px'
                    backgroundColor='#fff'
                    color='#000'
                    height='35px'
                    isActive={isActiveSortBy('createdAt')}
                >
                    Mới nhất
                </MyButton>
                <MyButton
                    onClick={() => handleChangeSortBy('sold')}
                    width='150px'
                    height='35px'
                    backgroundColor='#fff'
                    color='#000'
                    isActive={isActiveSortBy('sold')}
                >
                    Bán chạy
                </MyButton>

                <Box
                    sx={{
                        width: '50%',

                        [theme.breakpoints.up('md')]: {
                            width: '400px'
                        }
                    }}
                >
                    <FormControl sx={{ backgroundColor: '#fff', height: '35px' }} size='small' fullWidth>
                        <InputLabel sx={{ fontSize: '14px' }} id='demo-simple-select-label'>
                            Lọc theo giá
                        </InputLabel>
                        <Select
                            sx={{ height: '35px', fontSize: '14px' }}
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={order || ''}
                            label='Lọc theo giá'
                            onChange={(e) => handlePriceOrder(e.target.value)}
                        >
                            <MenuItem sx={{ fontSize: '14px' }} value='asc'>
                                Giá
                            </MenuItem>
                            <MenuItem sx={{ fontSize: '14px' }} value='asc'>
                                Từ thấp đến cao
                            </MenuItem>
                            <MenuItem sx={{ fontSize: '14px' }} value='desc'>
                                Từ cao đến thấp
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
