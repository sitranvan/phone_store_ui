import * as yup from 'yup'
export const changePasswordSchema = yup
    .object({
        oldPassword: yup.string().required('Mật khẩu cũ bắt buộc nhập').min(4, 'Mật khẩu tối thiểu 4 ký tự'),
        newPassword: yup.string().required('Mật khẩu mới bắt buộc nhập').min(4, 'Mật khẩu tối thiểu 4 ký tự'),
        confirmPassword: yup
            .string()
            .required('Xác nhận mật khẩu bắt buộc nhập')
            .min(4, 'Mật khẩu tối thiểu 4 ký tự')
            .oneOf([yup.ref('newPassword'), null], 'Xác nhận mật khẩu không khớp')
    })
    .required()
