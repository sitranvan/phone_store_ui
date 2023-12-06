import * as yup from 'yup'
export const loginSchema = yup
    .object({
        email: yup.string().required('Email bắt buộc nhập').email('Email không hợp lệ'),
        password: yup.string().required('Mật khẩu bắt buộc nhập').min(4, 'Mật khẩu tối thiểu 4 ký tự')
    })
    .required()

export const registerSchema = yup
    .object({
        name: yup.string().required('Họ tên bắt buộc nhập'),
        email: yup.string().required('Email bắt buộc nhập').email('Email không hợp lệ'),
        password: yup.string().required('Mật khẩu bắt buộc nhập').min(4, 'Mật khẩu tối thiểu 4 ký tự'),
        confirmPassword: yup
            .string()
            .required('Xác nhận mật khẩu bắt buộc nhập')
            .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp')
    })
    .required()
