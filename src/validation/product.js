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
