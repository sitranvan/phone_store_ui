import * as yup from 'yup'
export const createCategory = yup
    .object({
        name: yup.string().required('Tên loại sản phẩm bắt buộc nhập')
    })
    .required()
