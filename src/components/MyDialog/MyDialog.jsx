import React, { Fragment } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export default function MyDialog({ open, setOpen, title, children }) {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2)
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1)
        }
    }))

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <BootstrapDialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
                    {title}
                </DialogTitle>
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
                <DialogContent dividers>{children}</DialogContent>
            </BootstrapDialog>
        </Fragment>
    )
}
