import FilterListIcon from '@mui/icons-material/FilterList'
import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import { convertStatusOrder, formatCurrency, formatDate } from '../../../../common'
import orderApi from '../../../../apis/order'
import userApi from '../../../../apis/user'
import DialogStatus from './DialogStatus'

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Mã đơn'
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Ngày đặt'
    },
    {
        id: 'user',
        numeric: true,
        disablePadding: false,
        label: 'Người đặt'
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Tổng đơn'
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái'
    },
    {
        id: 'update',
        numeric: true,
        disablePadding: false,
        label: 'Cập nhật'
    }
]

function EnhancedTableHead() {
    return (
        <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
            <TableRow>
                <TableCell padding='checkbox'></TableCell>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align='left' padding={headCell.disablePadding ? 'none' : 'normal'}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

function EnhancedTableToolbar(props) {
    return (
        <Toolbar
            sx={{
                py: 2,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
            }}
        >
            <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                <TextField placeholder='Tìm kiếm đơn hàng' size='medium' sx={{ width: '450px' }} />
            </Typography>

            <Tooltip title='Filter list'>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}

export default function ManagerOrder() {
    const idRef = React.useRef()
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState('')
    const { data: ordersData, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: () => {
            return orderApi.getAll()
        },
        keepPreviousData: true
    })
    const orders = ordersData?.data.orders

    const handleClickOpen = (id) => {
        setOpen(true)
        idRef.current = id
    }

    const updateCancelledMutation = useMutation({
        mutationFn: (id) => orderApi.updateCancelled(id),
        onSuccess: () => {
            refetch()
        }
    })

    const updateShippeddMutation = useMutation({
        mutationFn: (id) => orderApi.updateShipped(id),
        onSuccess: () => {
            refetch()
        }
    })

    const updateDeliveredMutation = useMutation({
        mutationFn: (id) => orderApi.updateDelivered(id),
        onSuccess: () => {
            refetch()
        }
    })

    const handleClose = (value) => {
        setOpen(false)
        setSelectedValue(value)
        const id = idRef.current

        if (value == 'cancelled') {
            updateCancelledMutation.mutate(id)
        }
        if (value == 'delivered') {
            updateDeliveredMutation.mutate(id)
        }

        if (value == 'shipped') {
            updateShippeddMutation.mutate(id)
        }

        idRef.current = null
    }

    return (
        <React.Fragment>
            <DialogStatus selectedValue={selectedValue} open={open} onClose={handleClose} />
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        mb: 2,
                        px: 4,
                        py: 2,
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography fontSize='24px' component='p'>
                        Quản lý đơn hàng
                    </Typography>
                </Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                            <EnhancedTableHead />
                            <TableBody>
                                {orders &&
                                    orders.map((order, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`

                                        return (
                                            <TableRow
                                                hover
                                                role='checkbox'
                                                tabIndex={-1}
                                                key={order.id}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding='checkbox'></TableCell>
                                                <TableCell component='th' id={labelId} scope='row' padding='none'>
                                                    {order.id}
                                                </TableCell>
                                                <TableCell align='left'>{formatDate(order?.createdAt)}</TableCell>
                                                <TableCell align='left'>{order?.users?.name}</TableCell>
                                                <TableCell align='left'>{order?.users?.email}</TableCell>
                                                <TableCell align='left'>{formatCurrency(order?.finalTotal)}</TableCell>
                                                <TableCell align='left'>
                                                    <Button
                                                        color={
                                                            order.status === 'pending'
                                                                ? 'warning'
                                                                : order.status === 'shipped'
                                                                ? 'primary'
                                                                : order.status === 'delivered'
                                                                ? 'success'
                                                                : order.status === 'cancelled'
                                                                ? 'error'
                                                                : 'secondary'
                                                        }
                                                        variant='outlined'
                                                    >
                                                        {convertStatusOrder(order.status)}
                                                    </Button>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {order.status == 'pending' && (
                                                        <Button
                                                            color='success'
                                                            variant='outlined'
                                                            onClick={() => handleClickOpen(order.id)}
                                                        >
                                                            Cập nhật
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </React.Fragment>
    )
}
