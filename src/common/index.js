import { format } from 'date-fns'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function formatCurrency(currency) {
    return new Intl.NumberFormat('de-DE').format(currency)
}
const removeSpecialCharacter = (str) => {
    return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = (name, id) => {
    const nameStr = String(name)
    return removeSpecialCharacter(nameStr).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFormNameId = (nameId) => {
    const arr = nameId.split('-i-')
    // Lấy id là phần tử cuối cùng
    return arr[arr.length - 1]
}

export const confirmMessage = (cb) => {
    withReactContent(Swal).fire({
        title: 'Bạn có chắc?',
        text: 'Bạn có chắc chắn muốn xóa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, xóa ngay!',
        cancelButtonText: 'Không',
        preConfirm: () => {
            cb()
        }
    })
}

export const createFormData = (data) => {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    return formData
}

export const formatDate = (stringDate = '') => {
    return format(new Date(stringDate), 'dd-MM-yyyy')
}

export const convertStatusOrder = (status) => {
    switch (status) {
        case 'pending':
            return 'Chờ xác nhận'
        case 'shipped':
            return 'Đang giao'
        case 'delivered':
            return 'Đã giao'
        case 'cancelled':
            return 'Đã hủy'
    }
}

export const convertUpdateStatusOrder = (status) => {
    switch (status) {
        case 'pending':
            return 'Chờ xác nhận'
        case 'shipped':
            return 'Giao cho vận chuyển'
        case 'delivered':
            return 'Đã giao hàng'
        case 'cancelled':
            return 'Hủy đơn hàng'
    }
}
