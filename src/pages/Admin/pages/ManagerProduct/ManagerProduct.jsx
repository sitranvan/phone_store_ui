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
import { useNavigate, createSearchParams, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'
import productApi from '../../../../apis/product'
import { formatCurrency } from '../../../../common'
import useQuertConfig from '../../../../hooks/useQuertConfig'
import Pagination from './modules/Pagination'
import { BASE_URL_IMAGE } from '../../../../constants'
import ConfirmDelete from '../../../../components/Admin/ConfirmDelete'
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
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tên sản phẩm'
    },
    {
        id: 'photo',
        numeric: true,
        disablePadding: false,
        label: 'Hình ảnh'
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Giá tiền'
    },
    {
        id: 'brand',
        numeric: true,
        disablePadding: false,
        label: 'Thương hiệu'
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'Loại'
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

function EnhancedTableToolbar() {
    const navigate = useNavigate()

    const queryConfig = useQuertConfig()
    const { register, handleSubmit, setValue } = useForm()
    const handleSearch = handleSubmit((data) => {
        navigate({
            pathname: '/admin/product',
            search: createSearchParams({
                ...queryConfig,
                name: data.name
            }).toString()
        })
    })

    return (
        <Toolbar
            sx={{
                py: 2,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
            }}
        >
            <Box onSubmit={handleSearch} sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='form'>
                <TextField
                    {...register('name')}
                    placeholder='Tìm kiếm sản phẩm'
                    size='medium'
                    sx={{ width: '450px' }}
                />
            </Box>

            <Tooltip title='Filter list'>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}

export default function ManagerProduct() {
    const refId = React.useRef(null)
    const queryConfig = useQuertConfig()
    const { data: producstData, refetch } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getAllProduct(queryConfig)
        },
        keepPreviousData: true
    })
    const products = producstData?.data.products
    const pageSize = producstData?.data.pagination.page_size

    const [open, setOpen] = React.useState(false)

    const handleDelete = (id) => {
        setOpen(true)
        refId.current = id
    }

    const deleteMutation = useMutation({
        mutationFn: (id) => productApi.deleteProduct(id),
        onSuccess: () => {
            refetch()
        }
    })

    const handleConfirm = () => {
        const idDelete = refId.current
        deleteMutation.mutate(idDelete)
        refId.current = null
        setOpen(false)
    }

    return (
        <React.Fragment>
            <ConfirmDelete open={open} setOpen={setOpen} onConfirm={handleConfirm} />
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
                    <Typography color='gray' fontSize='24px' component='p'>
                        Quản lý sản phẩm
                    </Typography>
                    <Link to='/admin/product/create'>
                        <Button sx={{ height: '55px' }} variant='outlined' color='success'>
                            <FaPlus style={{ marginBottom: '4px', marginRight: '5px' }} fontSize='18px' />
                            Thêm sản phẩm
                        </Button>
                    </Link>
                </Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                            <EnhancedTableHead rowCount={rows.length} />
                            <TableBody>
                                {products &&
                                    products.map((product, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`

                                        return (
                                            <TableRow
                                                hover
                                                role='checkbox'
                                                tabIndex={-1}
                                                key={product.id}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding='checkbox'></TableCell>
                                                <TableCell
                                                    sx={{ width: '32%' }}
                                                    component='th'
                                                    id={labelId}
                                                    scope='row'
                                                    padding='none'
                                                >
                                                    {product.name}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <img
                                                        width='70'
                                                        src={
                                                            product?.photo.startsWith('http://') ||
                                                            product?.photo.startsWith('https://')
                                                                ? product?.photo
                                                                : BASE_URL_IMAGE + product?.photo
                                                        }
                                                        alt=''
                                                    />
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {formatCurrency(product.price) + 'đ'}
                                                </TableCell>
                                                <TableCell align='left'>{product.brand.name}</TableCell>
                                                <TableCell align='left'>{product.category.name}</TableCell>
                                                <TableCell align='left'>
                                                    <Button
                                                        onClick={() => handleDelete(product.id)}
                                                        variant='outlined'
                                                        color='error'
                                                    >
                                                        Xóa
                                                    </Button>
                                                    <Link to={`/admin/product/update/${product.id}`}>
                                                        <Button sx={{ ml: 1 }} variant='outlined' color='primary'>
                                                            Sửa
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'end', py: 3 }}>
                        <Pagination pageSize={pageSize} queryConfig={queryConfig} />
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>
    )
}
