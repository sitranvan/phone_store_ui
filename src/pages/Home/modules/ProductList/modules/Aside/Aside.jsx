import React, { Fragment } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { BiCategory } from 'react-icons/bi'
import { omit } from 'lodash'
import { TbBrandApple } from 'react-icons/tb'
import FilterAside from '../../../../../../components/FilterAside'
import LineAside from '../../../../../../components/LineAside/LineAside'
import FilterPriceRange from '../FilterPriceRange'
import FilterRatingStar from '../FilterRatingStar'
import MyButton from '../../../../../../components/MyButton'
export default function AsideCategory({ queryConfig, categories, brands }) {
    // queryConfig vì nếu đang sort bán chạy mà chọn danh mục thì phải lọc theo danh mục đó và bán chạy
    const navigate = useNavigate()
    const handleRemoveFilterAll = () => {
        navigate({
            pathname: '/',
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig
                    },
                    ['price_min', 'price_max', 'rating', 'category', 'brand']
                )
            ).toString()
        })
    }

    return (
        <Fragment>
            <FilterAside
                data={categories}
                queryConfig={queryConfig}
                title='Danh mục'
                icon={<BiCategory />}
                filterBy='category'
            />
            <LineAside />
            <FilterAside
                data={brands}
                queryConfig={queryConfig}
                title='Thương hiệu'
                icon={<TbBrandApple />}
                filterBy='brand'
            />
            <LineAside />
            <FilterPriceRange queryConfig={queryConfig} />
            <LineAside />
            <FilterRatingStar queryConfig={queryConfig} />
            <LineAside />
            <MyButton onClick={handleRemoveFilterAll} mt='8px' height='35px' width='100%'>
                Xóa tất cả
            </MyButton>
        </Fragment>
    )
}
