import React, { forwardRef } from 'react'

// Handle onchange events
// Dùng forwardRef để lấy các ref của react-hook-form có nhiều method hơn
const InputNumber = forwardRef(function ({ onChange, ...rest }, ref) {
    const handleChange = (e) => {
        const { value } = e.target
        if (/^\d+$/.test(value) || (value === '' && onChange)) {
            onChange(e)
        }
    }
    return (
        <div className=''>
            <input {...rest} onChange={handleChange} ref={ref} type='number' />
            <div className=''></div>
        </div>
    )
})

export default InputNumber
