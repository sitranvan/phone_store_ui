import AppBar from '@mui/material/AppBar'
import { useTheme } from '@mui/material/styles'
import { HEADER, NAV } from '../../../constants/config'
import { useResponsive } from '../../../hooks/useResponsive'
import { bgBlur } from '../Theme/css'

export default function Header({ onOpenNav }) {
    const theme = useTheme()

    const lgUp = useResponsive('up', 'lg')

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter
                }),
                ...(lgUp && {
                    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
                    height: HEADER.H_DESKTOP
                })
            }}
        ></AppBar>
    )
}
