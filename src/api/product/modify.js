
import request from '@/utils/request'

export function getEditInfo(data) {
  return request({
    url: '/product/edit',
    method: 'get',
    params: data
  })
}
