// 如果需要使用Mock生成随机结果，则需要引入Mock模块，文档见 http://mockjs.com/
// import Mock from 'mockjs'
// 引入param2Obj模块用于处理传入的参数
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100
const remark = '我是一个备注！！！！'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@first',
    title: '@title(5, 10)',
    price: '@float(0, 100, 2, 2)',
    stock: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'], // 随机选一个
    createTime: '@datetime',
    remark: remark
  }))
}

export default {
  getList: config => {
    const { name, pageNumber = 1, pageSize = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < pageSize * pageNumber && index >= pageSize * (pageNumber - 1))
    return {
      code: 20000,
      success: true,
      message: '操作成功',
      total: mockList.length,
      resultMap: {
        items: pageList
      }
    }
  },
  getEditInfo: config => {
    const { detailId } = param2Obj(config.url)
    let list = {}
    for (const article of List) {
      if (article.id === +detailId) {
        list = article
        break
      }
    }
    return {
      code: 20000,
      success: true,
      message: '操作成功',
      resultMap: {
        items: list
      }
    }
  }
}
