import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Review from '../Review'
export default function Tabs() {
    const [value, setValue] = React.useState('1')

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
                    <Typography component='div'>Item One</Typography>
                </TabPanel>
                <TabPanel value='2'>
                    <Typography component='div'>Item Two</Typography>
                </TabPanel>
                <TabPanel value='3'>
                    <Review />
                </TabPanel>
            </TabContext>
        </Box>
    )
}
