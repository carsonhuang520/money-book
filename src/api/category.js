import service from '../utils/request'

export function getCategoriesByType(type) {
  return service({
    url: '/category',
    method: 'get',
    params: {
      type
    }
  })
}

export function addCategory(category) {
  return service({
    url: '/category',
    method: 'post',
    data: category
  })
}

export function deleteCategory(id, type) {
  return service({
    url: `/category/${id}?type=${type}`,
    method: 'delete'
  })
}

export function getNewIcons() {
  return service({
    url: '/icons',
    method: 'get'
  })
}