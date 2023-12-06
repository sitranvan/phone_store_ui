import StarIcon from '@mui/icons-material/Star'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useState, Fragment } from 'react'

import { Card, Rating } from '@mui/material'
import ButtonCustom from '../../../../components/Button/ButtonCustom'
import Textarea from '../../../../components/Textarea'
import './styles.scss'

export default function Review() {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <div className='review'>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    mb: 2,
                    backgroundColor: 'E8F0F2'
                }}
            >
                <Card sx={{ width: '200px', my: 3, textAlign: 'center', p: 1 }}>
                    <Typography
                        textTransform='uppercase'
                        component='div'
                        color='ThreeDHighlight'
                        fontWeight='600'
                        variant='h6'
                    >
                        Tổng Đánh Giá
                    </Typography>
                    <Box sx={{ display: 'flex', mt: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography component='div' fontWeight='700' color='GrayText' variant='h3'>
                            5
                        </Typography>
                        <StarIcon fontSize='large' color='warning' />
                    </Box>
                    <Typography component='div' fontWeight='500'>
                        18 lượt
                    </Typography>
                </Card>
            </Box>
            <Box>
                <Typography variant='h5' component='h2' fontWeight='500'>
                    Đánh Giá Của Bạn
                </Typography>

                <Rating
                    size='large'
                    name='simple-controlled'
                    value={1}
                    sx={{ mt: 2 }}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                />
                <Box sx={{ mt: 2 }}>
                    <Textarea placeholder='Nhập đánh giá...' />
                </Box>

                <ButtonCustom sx={{ width: '100px', my: 3 }}>Gửi</ButtonCustom>
                <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                            primary='Brunch this weekend?'
                            secondary={
                                <Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                            primary='Summer BBQ'
                            secondary={
                                <Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {" — Wish I could come, but I'm out of town this…"}
                                </Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                            primary='Oui Oui'
                            secondary={
                                <Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
        </div>
    )
}
