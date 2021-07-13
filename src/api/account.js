import service from '../utils/request'

export function addAccount(item) {
  return service({
    url: '/accounts',
    method: 'post',
    data: item
  })
}

export function getAccountList(date) {
  return service({
    url: '/accounts',
    method: 'get',
    params: {
      date
    }
  })
}

export function getTotalAccounts(date) {
  return service({
    url: '/accounts/total',
    method: 'get',
    params: {
      date
    }
  })
}

export function getChartAccounts(date, type) {
  return service({
    url: '/accounts/charts',
    method: 'get',
    params: {
      date,
      type
    }
  })
}

export function deleteAccount(id) {
  return service({
    url: `/accounts/${id}`,
    method: 'delete'
  })
}