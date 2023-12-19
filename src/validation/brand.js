import * as yup from 'yup'
export const createBrandSchema = yup
    .object({
        name: yup.string().trim().required('Tên thương hiệu bắt buộc nhập')
    })
    .required()
