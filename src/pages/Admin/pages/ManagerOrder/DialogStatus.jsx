import { GrUpdate } from 'react-icons/gr'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { blue, green } from '@mui/material/colors'
import * as React from 'react'
import { convertStatusOrder, convertUpdateStatusOrder } from '../../../../common'

const status = ['shipped', 'delivered', 'cancelled']

export default function DialogStatus({ onClose, selectedValue, open }) {
    const handleClose = () => {
        onClose(selectedValue)
    }

    const handleListItemClick = (value) => {
        onClose(value)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
            <List sx={{ pt: 0 }}>
                {status.map((st) => {
                    return (
                        <ListItem disableGutters key={st}>
                            <ListItemButton onClick={() => handleListItemClick(st)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                                        <GrUpdate />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={convertUpdateStatusOrder(st)} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Dialog>
    )
}
