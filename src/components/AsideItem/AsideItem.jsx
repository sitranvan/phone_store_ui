import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import './styles.scss'
export default function AsideItem({ data, queryConfig, title, icon, filterBy }) {
    return (
        <div className='filter-wrap'>
            <h4>
                {icon}
                <span>{title}</span>
            </h4>
            <ul>
                {data &&
                    data.map((itemData) => (
                        <li style={{ color: queryConfig[filterBy] == itemData.id ? 'red' : '' }} key={itemData.id}>
                            <Link
                                className='filter-link'
                                to={{
                                    pathname: '/',
                                    search: createSearchParams({
                                        ...queryConfig,
                                        [filterBy]: itemData.id
                                    }).toString()
                                }}
                            >
                                <ArrowRightIcon sx={{ mb: '2px', fontSize: '20px' }} />
                                <span>{itemData.name}</span>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
