import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Container } from '@mui/system'
import Breadcrumb from '../../components/Breadcrumb'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import './styles.scss'
import { Divider, Typography } from '@mui/material'
import ButtonCustom from '../../components/Button/ButtonCustom'
import PaymentTitle from './modules/PaymentTitle'

export default function Cart() {
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
                        <TableRow sx={{ height: '100px', '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell width='500px' component='th' scope='row'>
                                <div className='cart-product'>
                                    <img
                                        srcSet='https://cdn.viettelstore.vn/Images/Product/ProductImage/1778159139.jpeg'
                                        alt=''
                                    />
                                    <div className='cart-product-content'>
                                        <span className='cart-product-name'>
                                            Điện thoại sumsung galaxy 512GB nnđ ndnd nd d nd dmdmd md dm mmd m dmd
                                        </span>
                                        <p className='cart-product-color'>Màu sắc: Tím</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align='right'>
                                <div className='quantity'>
                                    <div className='quantity-decrement'>
                                        <RemoveIcon />
                                    </div>
                                    <div className='quantity-num'>3</div>
                                    <div className='quantity-increment'>
                                        <AddIcon />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align='right'>23.368.478</TableCell>
                            <TableCell align='right'>23.368.478</TableCell>
                            <TableCell align='right'>
                                <DeleteSweepIcon color='error' />
                            </TableCell>
                        </TableRow>
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
                            <Typography fontWeight='600' fontSize='25px' color='indigo' component='span'>
                                TỔNG
                            </Typography>
                            <Typography fontWeight='600' fontSize='25px' color='indigo' component='span'>
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
