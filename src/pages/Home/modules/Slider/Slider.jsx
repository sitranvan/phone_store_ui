import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './styles.scss'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { Container } from '@mui/material'

export default function Slider() {
    return (
        <Container sx={{ mt: 2, mb: 4 }}>
            <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                pagination={{
                    clickable: true
                }}
                navigation={true}
                modules={[Autoplay, Navigation, Pagination]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <img srcSet='https://i.ytimg.com/vi/3Km78Bx_SWE/maxresdefault.jpg' alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        srcSet='https://img.freepik.com/premium-vector/product-advertising-hero-image-header-layout_1302-21013.jpg'
                        alt=''
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        srcSet='https://img.freepik.com/premium-vector/modern-style-square-colorful-web-banner-design-premium-vector_656447-13.jpg'
                        alt=''
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        srcSet='https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-purple-2-5d-stereoscopic-building-image_17433.jpg'
                        alt=''
                    />
                </SwiperSlide>
            </Swiper>
        </Container>
    )
}
