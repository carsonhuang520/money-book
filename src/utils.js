import {message, Modal} from 'antd'
import {QuestionCircleOutlined} from '@ant-design/icons'

export const toThousandFilter = (num) => {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export const getYearAndMonth = (type) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return type === 'date'
    ? year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day)
    : year + '-' + (month >= 10 ? month : '0' + month)
}

export const confirm = (title) => {
  Modal.confirm({
    title: title,
    centered: true,
    icon: <QuestionCircleOutlined/>,
    okText: '确认',
    cancelText: '取消'
  })
}

export const success = (title) => {
  message.success(title)
}

export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9)
}