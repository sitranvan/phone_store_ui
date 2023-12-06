import React from 'react'
import Header from '../../components/Header'

export default function MainLayout({ children }) {
    return (
        <div className=''>
            <Header />
            {children}
        </div>
    )
}
