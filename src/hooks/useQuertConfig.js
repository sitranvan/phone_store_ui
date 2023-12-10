import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'

export default function useQuertConfig() {
    const queryParams = useQueryParams()
    // Lọc các giá trị rác URL, loại bỏ undefined bằng lodash
    const queryConfig = omitBy(
        {
            page: queryParams.page || 1,
            limit: queryParams.limit,
            sort_by: queryParams.sort_by,
            order: queryParams.order,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            category: queryParams.category,
            brand: queryParams.brand,
            rating: queryParams.rating,
            name: queryParams.name
            // bổ sung
        },
        isUndefined
    )
    return queryConfig
}
