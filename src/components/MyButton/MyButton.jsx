import React from 'react'
import './styles.scss'
import classNames from 'classnames'
export default function MyButton({
    children,
    onClick,
    type = 'button',
    width,
    height,
    backgroundColor,
    color,
    isActive,
    mt,
    mb,
    fontSize,
    icon
}) {
    const buttonClasses = classNames('my-btn', {
        'btn-active': isActive
    })
    return (
        <button
            type={type}
            onClick={onClick}
            style={{ width, height, backgroundColor, color, marginTop: mt, marginBottom: mb, fontSize }}
            className={buttonClasses}
        >
            {icon}
            {children}
        </button>
    )
}
