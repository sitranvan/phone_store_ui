import React, { Fragment, useState } from 'react'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import TabContext from '@mui/lab/TabContext'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Rating, Box, Tab } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FaStar } from 'react-icons/fa'
import ButtonCustom from '../../../../components/Button/ButtonCustom'
import Textarea from '../../../../components/Textarea'
import DOMPurify from 'dompurify'

export default function Tabs({ product }) {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%', mt: 6 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <TabList onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab label='Mô tả' value='1' />
                        <Tab label='Thông số kỹ thuật' value='2' />
                        <Tab label='Đánh giá' value='3' />
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <Typography component='div'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description)
                            }}
                        />
                    </Typography>
                </TabPanel>
                <TabPanel value='2'>
                    <Typography component='div'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.specification)
                            }}
                        />
                    </Typography>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='3'>
                    <div className='review'>
                        <Box sx={{ textAlign: 'center' }}>
                            <ButtonCustom color='warning' variant='outlined' sx={{ mt: 3, mb: 4, py: 2, px: 4 }}>
                                Tổng đánh giá: 5 <FaStar color='#FAAF00' />
                            </ButtonCustom>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'E8F0F2'
                            }}
                        ></Box>
                        <Box>
                            <Typography color='#000000CC' fontSize='18px' component='p' fontWeight='500'>
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

                            <ButtonCustom sx={{ width: '150px', my: 3 }}>Gửi</ButtonCustom>
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
                </TabPanel>
            </TabContext>
        </Box>
    )
}
