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

export const confirm = (title, okFn) => {
  Modal.confirm({
    title: title,
    centered: true,
    icon: <QuestionCircleOutlined/>,
    okText: '确认',
    cancelText: '取消',
    onOk: okFn ? okFn : () => {
    }
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

export const flatternCategory = (categories) => {
  return categories.reduce((prev, item) => {
    prev[item.id] = item
    return prev
  }, {})
}

export const flatternItems = (items) => {
  let list = {}
  items.forEach(item => {
    if (!list[item.date]) {
      list[item.date] = []
    }
    list[item.date].push(item)
  })
  return list
}

export const flatternItemsByType = (items, categoriesFlattern) => {
  return items.reduce((prev, item) => {
    const name = categoriesFlattern[item.cid].name
    const cType = categoriesFlattern[item.cid].type
    if (!prev[cType]) {
      prev[cType] = {}
    }
    if (!prev[cType][name]) {
      prev[cType][name] = []
    }
    prev[cType][name].push(item)
    return prev
  }, {})
}

export const getTotal = (list, categoriesFlattern) => {
  return list.reduce((prev, cur) => {
    prev = prev + (categoriesFlattern[cur.cid].type === 'outcome' ? -1 * cur.price : cur.price)
    return prev
  }, 0)
}