import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Container } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { Button, Checkbox, Divider, Typography } from '@mui/material'
import PaymentTitle from './modules/PaymentTitle'
import { useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Breadcrumb from '../../components/Breadcrumb'
import ButtonCustom from '../../components/Button/ButtonCustom'
import { AppContext } from '../../contexts/App'
import cartApi from '../../apis/cart'
import './styles.scss'
import { confirmMessage } from '../../common'

const paymentCart = [
    {
        title: 'Tổng giỏ hàng',
        price: '4.444.000VND'
    },
    {
        title: 'Phí vận chuyển',
        price: 'Miễn phí'
    },
    {
        title: 'Khuyến mãi',
        price: '1.000.000VNĐ'
    }
]

export default function Cart() {
    const { carts, handleRefetchCart } = useContext(AppContext)

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

    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumb />
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
                                                onChange={(e) => handleQuantityChange(cart.products.id, e.target.value)}
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
                                        {cart.products.promotionPrice || cart.products.price}
                                    </TableCell>
                                    <TableCell align='right'>{cart.total}</TableCell>
                                    <TableCell align='right'>
                                        <Button onClick={() => confirmDelete(cart.products.id)}>
                                            <DeleteSweepIcon sx={{ width: '25px', height: '25px' }} color='error' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
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
                <Box>
                    <Typography mb={1} fontSize='14px' fontWeight='500' component='p'>
                        Mã khuyến mãi (nếu có)
                    </Typography>
                    <div className='cart-promotion'>
                        <div className='cart-promotion-form'>
                            <input type='text' />
                            <button>Xác nhận</button>
                        </div>
                    </div>

                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {paymentCart.map((item) => (
                            <PaymentTitle key={item.title} total={item.total} title={item.title} price={item.price} />
                        ))}
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
                                3.444.000VNĐ
                            </Typography>
                        </Box>
                        <ButtonCustom sx={{ mt: 2 }}>Thanh toán</ButtonCustom>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
