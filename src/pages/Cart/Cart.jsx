import AddIcon from '@mui/icons-material/Add'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import RemoveIcon from '@mui/icons-material/Remove'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box, Container } from '@mui/system'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import cartApi from '../../apis/cart'
import couponApi from '../../apis/coupon'
import orderApi from '../../apis/order'
import userApi from '../../apis/user'
import emptyCart from '../../assets/images/empty-cart.png'
import { confirmMessage, formatCurrency } from '../../common'
import Breadcrumb from '../../components/Breadcrumb'
import ButtonCustom from '../../components/Button/ButtonCustom'
import MyButton from '../../components/MyButton'
import { AppContext } from '../../contexts/App'
import { useDebounce } from '../../hooks/useDebounce'
import './styles.scss'

export default function Cart() {
    const { carts, handleRefetchCart } = useContext(AppContext)
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const debouncedValue = useDebounce(code, 500)
    const [couponValue, setCouponValue] = useState(null)
    const [address, setAddress] = useState([])
    const [note, setNote] = useState('')
    const [open, setOpen] = useState(false)
    const [quantities, setQuantities] = useState({})
    useEffect(() => {
        if (carts) {
            const initialQuantities = {}
            carts.forEach((cart) => {
                initialQuantities[cart.products.id] = cart.quantity || 1
            })
            setQuantities(initialQuantities)
        }
    }, [carts])
    const updateCartMutation = useMutation({
        mutationFn: (body) => cartApi.updateCart(body),
        onSuccess: () => {
            handleRefetchCart()
        }
    })

    const deleteProductFromCartMutation = useMutation({
        mutationFn: (body) => cartApi.deleteProductInCart(body),
        onSuccess: () => {
            handleRefetchCart()
        }
    })

    const handleQuantityChange = (productId, newQuantity) => {
        if (!Number(newQuantity)) {
            return
        }
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity
        }))
    }
    const handleIncrement = (productId) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[productId] || 1
            const newQuantity = currentQuantity + 1
            console.log({ productId, quantity: newQuantity })
            updateCartMutation.mutate({ productId, quantity: newQuantity })
            return {
                ...prevQuantities,
                [productId]: currentQuantity + 1
            }
        })
    }
    const handleDecrement = (productId) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[productId] || 1
            const newQuantity = currentQuantity - 1
            updateCartMutation.mutate({ productId, quantity: newQuantity })
            return {
                ...prevQuantities,
                [productId]: currentQuantity - 1
            }
        })
    }

    const confirmDelete = (productId) => {
        confirmMessage(() => {
            deleteProductFromCartMutation.mutate({ productId })
        })
    }

    // Tính tiền tổng giỏ hàng
    const totalCart = carts && carts.length > 0 ? carts.reduce((total, item) => total + item.total, 0) : 0

    const { data: coupon, status } = useQuery({
        queryKey: ['coupon', debouncedValue],
        queryFn: () => couponApi.getCoupon(debouncedValue)
    })

    // Thêm mã giảm giá
    const addCoupon = async () => {
        if (code.trim() == '') {
            toast.warning('Vui lòng nhập mã giảm giá')
        } else {
            if (coupon) {
                if (status === 'success') {
                    const couponData = coupon?.data?.coupon

                    if (couponData) {
                        const { type, value } = couponData

                        if (type === 'money') {
                            setCouponValue(value)
                        } else if (type === 'percent') {
                            const couponValueFinal = (totalCart * value) / 100
                            setCouponValue(couponValueFinal)
                        }

                        toast.success('Áp dụng mã giảm giá thành công!')
                    } else {
                        toast.error('Mã giảm giá không tồn tại hoặc hết hạn!')
                    }
                } else if (status === 'error') {
                    toast.error('Áp dụng mã giảm giá thất bại!')
                }
            }
        }
    }
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userApi.getMe()
    })

    // Mở dialog thanh toán
    const handleOpenOrder = () => {
        setOpen(true)
        const {
            profile: { address }
        } = profile?.data
        setAddress(address)
    }

    // Xử lý thêm mã giảm giá vào databse
    const addCouponMutation = useMutation({
        mutationFn: (body) => couponApi.addCoupon(body)
    })

    // Xử lý tạo đơn hàng
    const createOrderMutation = useMutation({
        mutationFn: (body) => orderApi.createOrder(body)
    })

    // Xử lý thanh toán
    const handlePayment = (e) => {
        e.preventDefault()
        if (code) {
            addCouponMutation.mutate({ codeCoupon: code })
        }
        createOrderMutation.mutate({ note })
        setOpen(false)
        navigate('/profile')
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumb page='Giỏ hàng' />
            <TableContainer sx={{ mt: 5 }} component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell align='right'>Số lượng</TableCell>
                            <TableCell align='right'>Đơn giá</TableCell>
                            <TableCell align='right'>Tổng&nbsp;(VND)</TableCell>
                            <TableCell align='right'>Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    {carts && carts.length > 0 ? (
                        <TableBody>
                            {carts &&
                                carts.map((cart) => (
                                    <TableRow
                                        key={cart.id}
                                        sx={{ height: '100px', '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell width='500px' component='th' scope='row'>
                                            <div className='cart-product'>
                                                <img srcSet={cart.products.photo} alt='' />
                                                <div className='cart-product-content'>
                                                    <span className='cart-product-name'>{cart.products.name}</span>
                                                    <p className='cart-product-color'>Màu sắc: tính sau</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <div className='quantity'>
                                                <div
                                                    style={{
                                                        pointerEvents:
                                                            cart.quantity <= 1 || updateCartMutation.isPending
                                                                ? 'none'
                                                                : 'auto',
                                                        opacity:
                                                            cart.quantity <= 1 || updateCartMutation.isPending ? 0.5 : 1
                                                    }}
                                                    onClick={(e) => handleDecrement(cart.products.id)}
                                                    className='quantity-decrement'
                                                >
                                                    <RemoveIcon />
                                                </div>
                                                <input
                                                    onChange={(e) =>
                                                        handleQuantityChange(cart.products.id, e.target.value)
                                                    }
                                                    value={quantities[cart.products.id] || 1}
                                                    min={1}
                                                    type='text'
                                                />
                                                <div
                                                    style={{
                                                        pointerEvents: updateCartMutation.isPending ? 'none' : 'auto',
                                                        opacity: updateCartMutation.isPending ? 0.5 : 1
                                                    }}
                                                    onClick={(e) => handleIncrement(cart.products.id)}
                                                    className='quantity-increment'
                                                >
                                                    <AddIcon />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>
                                            {(cart.products.promotionPrice &&
                                                formatCurrency(cart.products.promotionPrice)) ||
                                                formatCurrency(cart.products.price)}
                                        </TableCell>
                                        <TableCell align='right'>{formatCurrency(cart.total)}</TableCell>
                                        <TableCell align='right'>
                                            <Button onClick={() => confirmDelete(cart.products.id)}>
                                                <DeleteSweepIcon sx={{ width: '25px', height: '25px' }} color='error' />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }} colSpan={5}>
                                    <img width={180} height={180} srcSet={emptyCart} alt='empty-cart' />

                                    <Link style={{ textAlign: 'center', display: 'block' }} to='/'>
                                        <Button sx={{ mt: 2 }} variant='contained' color='primary'>
                                            Tiếp tục mua sắm
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    mt: 5,
                    mb: 2,
                    '@media screen and (max-width: 600px)': {
                        width: '100%',
                        display: 'block'
                    }
                }}
            >
                {carts && carts.length > 0 && (
                    <Box>
                        <Typography mb={1} fontSize='14px' fontWeight='500' component='p'>
                            Mã khuyến mãi (nếu có)
                        </Typography>
                        <div className='cart-promotion'>
                            <div className='cart-promotion-form'>
                                <input onChange={(e) => setCode(e.target.value)} value={code} type='text' />
                                <button onClick={addCoupon}>Xác nhận</button>
                            </div>
                        </div>

                        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography fontSize='14px' color='GrayText' component='span'>
                                    Tổng giỏ hàng
                                </Typography>
                                <Typography color='Highlight' component='span'>
                                    {formatCurrency(totalCart) + 'đ'}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography fontSize='14px' color='GrayText' component='span'>
                                    Khuyến mãi
                                </Typography>
                                <Typography color='error' component='span'>
                                    {couponValue ? formatCurrency(couponValue) + 'đ' : 'Chưa áp dụng'}
                                </Typography>
                            </Box>
                            <Divider sx={{ mt: 3, mb: 1 }} component='li' />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography fontWeight='500' fontSize='25px' color='#000000CC' component='span'>
                                    TỔNG
                                </Typography>
                                <Typography fontWeight='500' fontSize='25px' color='#000000CC' component='span'>
                                    {formatCurrency(totalCart - couponValue) + 'đ'}
                                </Typography>
                            </Box>
                            <ButtonCustom onClick={handleOpenOrder} sx={{ mt: 2 }}>
                                Đặt hàng
                            </ButtonCustom>
                        </Box>
                    </Box>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Xác nhận thanh toán</DialogTitle>
                <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Box onSubmit={handlePayment} method='POST' component='form'>
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id='outlined-helperText'
                            inputProps={{
                                readOnly: true
                            }}
                            label='Tỉnh thành'
                            defaultValue={address[0]?.province}
                        />
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id='outlined-helperText'
                            inputProps={{
                                readOnly: true
                            }}
                            label='Quận huyện'
                            aria-readonly={true}
                            defaultValue={address[0]?.district}
                        />
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id='outlined-helperText'
                            label='Phường xã'
                            inputProps={{
                                readOnly: true
                            }}
                            defaultValue={address[0]?.village}
                        />
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id='outlined-helperText'
                            label='Số nhà, tên đường...'
                            inputProps={{
                                readOnly: true
                            }}
                            defaultValue={address[0]?.shortDescription}
                        />
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id='outlined-helperText'
                            label='Số điện thoại'
                            inputProps={{
                                readOnly: true
                            }}
                            defaultValue={address[0]?.phone}
                        />

                        <Box sx={{ textAlign: 'right' }}>
                            <Button>Cập nhật lại thông tin</Button>
                        </Box>
                        <div className='textarea-custom'>
                            <p>Lưu ý </p>
                            <textarea
                                rows={3}
                                id='note'
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                sx={{ mb: 3 }}
                            />
                        </div>

                        <FormLabel
                            sx={{ fontSize: '14px', color: '#00000099', mt: 2, ml: 2 }}
                            id='demo-row-radio-buttons-group-label'
                        >
                            Hình thức thanh toàn
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                        >
                            <FormControlLabel value='female' control={<Radio />} label='Tiền mặt' />
                            <FormControlLabel value='male' control={<Radio />} label='Chuyển khoản' />
                        </RadioGroup>

                        <Typography
                            sx={{ textAlign: 'right', my: 3, fontSize: '20px', fontWeight: '500', color: '#ee4d2d' }}
                        >
                            Tổng cộng: {formatCurrency(totalCart - couponValue) + 'đ'}
                        </Typography>
                        <MyButton
                            type='submit'
                            onClick={handlePayment}
                            mt='20px'
                            height='40px'
                            fontSize='16px'
                            width='100%'
                        >
                            Thanh toán
                        </MyButton>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    )
}
