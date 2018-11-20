import request from '@/utils/request'

export function getList(queryData) {
  return request({
    url: '/product/list',
    method: 'get',
    params: queryData
  })
}
