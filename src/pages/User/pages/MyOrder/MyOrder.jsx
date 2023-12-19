import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { FaShippingFast } from 'react-icons/fa'
import orderApi from '../../../../apis/order'
import { convertStatusOrder, formatCurrency, formatDate } from '../../../../common'

export default function MyOrder() {
    const { data: ordersData } = useQuery({
        queryKey: ['orders'],
        queryFn: () => orderApi.getAll()
    })
    const orders = ordersData?.data.orders
    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            <Box sx={{ p: 4 }}>
                <Typography
                    sx={{
                        textTransform: 'capitalize',
                        fontSize: '18px',
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                    component='p'
                >
                    Đơn hàng của tôi
                    <FaShippingFast fontSize='28px' />
                </Typography>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>Lọc theo ngày đặt</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Lọc theo ngày đặt'
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>Lọc theo trạng thái</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Lọc theo trạng thái'
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <TableContainer sx={{ px: 2 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '15%' }}>Mã đơn</TableCell>
                            <TableCell sx={{ width: '20%' }} align='left'>
                                Ngày đặt
                            </TableCell>
                            <TableCell sx={{ width: '20%' }} align='left'>
                                Tổng tiền
                            </TableCell>
                            <TableCell sx={{ width: '20%' }} align='left'>
                                Trạng thái
                            </TableCell>
                            <TableCell align='left'>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders &&
                            orders.map((order) => (
                                <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {order.id}
                                    </TableCell>
                                    <TableCell align='left'>{formatDate(order.createdAt)}</TableCell>
                                    <TableCell align='left'>{formatCurrency(order.finalTotal) + 'đ'}</TableCell>
                                    <TableCell align='left'>
                                        <Button color='secondary'> {convertStatusOrder(order.status)}</Button>
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Link style={{ display: 'flex', gap: 10 }}>
                                            <Button variant='outlined' size='small'>
                                                Chi tiết
                                            </Button>
                                            <Button color='error' variant='outlined' size='small'>
                                                Hủy
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
