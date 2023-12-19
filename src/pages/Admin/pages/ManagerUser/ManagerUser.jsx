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
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import userApi from '../../../../apis/user'
function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein
    }
}

const rows = [
    createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(2, 'Donut', 452, 25.0, 51, 4.9),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
    createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
    createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
    createData(9, 'KitKat', 518, 26.0, 65, 7.0),
    createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
    createData(11, 'Marshmallow', 318, 0, 81, 2.0),
    createData(12, 'Nougat', 360, 19.0, 9, 37.0),
    createData(13, 'Oreo', 437, 18.0, 63, 4.0)
]

const headCells = [
    {
        id: 'st',
        numeric: false,
        disablePadding: true,
        label: 'STT'
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Tên khách hàng'
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'verified',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái'
    },
    {
        id: 'Hành động',
        numeric: true,
        disablePadding: false,
        label: 'Hành động'
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
                <TextField placeholder='Tìm kiếm khách hàng' size='medium' sx={{ width: '450px' }} />
            </Typography>

            <Tooltip title='Filter list'>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}

export default function ManagerUser() {
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const { data: usersData } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return userApi.getAll()
        },
        keepPreviousData: true
    })
    const users = usersData?.data.users
    return (
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
                    Quản lý khách hàng
                </Typography>
            </Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead rowCount={rows.length} />
                        <TableBody>
                            {users &&
                                users.map((user, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            role='checkbox'
                                            tabIndex={-1}
                                            key={user.id}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding='checkbox'></TableCell>
                                            <TableCell component='th' id={labelId} scope='row' padding='none'>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align='left'>{user?.name}</TableCell>
                                            <TableCell align='left'>{user?.email}</TableCell>
                                            <TableCell align='left'>
                                                {user?.verified == false ? (
                                                    <Button color='warning'>Chưa kích hoạt</Button>
                                                ) : (
                                                    <Button color='success'>Đã kích hoạt</Button>
                                                )}
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Button variant='outlined'>Vô hiệu hóa</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}
