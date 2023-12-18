import * as yup from 'yup'
export const filterPriceSchema = yup
    .object({
        price_min: yup.string().test({
            name: 'price-not-allowed',
            message: 'Giá không phù hợp',
            test: function (value) {
                const price_min = value
                const { price_max } = this.parent
                if (price_min !== '' && price_max !== '') {
                    return Number(price_max) >= Number(price_min)
                }
                return price_min !== '' || price_max !== ''
            }
        }),
        price_max: yup.string().test({
            name: 'price-not-allowed',
            message: 'Giá không phù hợp',
            test: function (value) {
                const price_max = value
                const { price_min } = this.parent
                if (price_min !== '' && price_max !== '') {
                    return Number(price_max) >= Number(price_min)
                }
                return price_min !== '' || price_max !== ''
            }
        })
    })
    .required()

export const searchSchema = yup
    .object({
        name: yup.string().trim().required()
    })
    .required()

export const createProductSchema = yup
    .object({
        name: yup.string().trim().required('Tên sản phẩm bắt buộc nhập'),
        price: yup.string().required('Giá tiền bắt buộc nhập'),
        brandId: yup.string().required('Thương hiệu bắt buộc chọn'),
        categoryId: yup.string().required('Loại sản phẩm bắt buộc chọn')
    })
    .required()
