import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import { createSearchParams, useNavigate } from 'react-router-dom'
import './styles.scss'
export default function FilterRatingStar({ queryConfig }) {
    const navigate = useNavigate()
    const handleFilterStar = (rating) => {
        navigate({
            pathname: '/',
            search: createSearchParams({
                ...queryConfig,
                rating
            }).toString()
        })
    }

    return (
        <div className='filter-wrap'>
            <h4>
                <MdOutlineRateReview />
                <span>Đánh giá</span>
            </h4>

            <ul>
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <li key={index} onClick={() => handleFilterStar(5 - index)} className='filter-star'>
                            {Array(5)
                                .fill(0)
                                .map((_, indexStar) => {
                                    if (indexStar < 5 - index) {
                                        return (
                                            <FaStar
                                                key={indexStar}
                                                fontSize='14px'
                                                color={5 - index == queryConfig.rating ? '#ee4d2d' : '#f59e0b'}
                                            />
                                        )
                                    }
                                    return <FaStar key={indexStar} fontSize='14px' color='#afafaf' />
                                })}
                            {index !== 0 ? (
                                <span style={{ color: 5 - index == queryConfig.rating ? '#ee4d2d' : '#000000CC' }}>
                                    Trở lên
                                </span>
                            ) : (
                                ''
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
