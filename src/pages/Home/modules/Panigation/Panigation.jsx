import React, { useState } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Link, createSearchParams } from 'react-router-dom'

export default function Panigation({ pageSize, queryConfig }) {
    const [page, setPage] = useState(1)
    const handleChange = (event, value) => {
        setPage(value)
    }
    return (
        <Pagination
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 6
            }}
            count={pageSize}
            page={page}
            onChange={handleChange}
            color='secondary'
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={{
                        pathname: '/',
                        search: createSearchParams({
                            ...queryConfig,
                            page: item.page
                        }).toString()
                    }}
                />
            )}
        />
    )
}
