import React from 'react'
import './styles.scss'
export default function ProductRating({ rating, starSize, color, fill }) {
    const handleWidth = (order) => {
        if (order <= rating) {
            return '100%'
        }

        if (order > rating && order - rating < 1) {
            return (rating - Math.floor(rating)) * 100 + '%'
        }

        return '0%'
    }

    return (
        <div className='rating'>
            {Array(5)
                .fill(0)
                .map((_, index) => (
                    <div className='relative' key={index}>
                        <div className='absolute' style={{ width: handleWidth(index + 1) }}>
                            <svg
                                style={{
                                    width: `${starSize}px`,
                                    height: `${starSize}px`,
                                    color: `${color}`,
                                    fill: `${fill}`
                                }}
                                enableBackground='new 0 0 15 15'
                                viewBox='0 0 15 15'
                                x={0}
                                y={0}
                                className='active'
                            >
                                <polygon
                                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit={10}
                                />
                            </svg>
                        </div>
                        <svg
                            style={{ width: `${starSize}px`, height: `${starSize}px` }}
                            enableBackground='new 0 0 15 15'
                            viewBox='0 0 15 15'
                            x={0}
                            y={0}
                            className='unactive'
                        >
                            <polygon
                                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit={10}
                            />
                        </svg>
                    </div>
                ))}
        </div>
    )
}
