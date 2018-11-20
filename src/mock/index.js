// 引入Mock模块
import Mock from 'mockjs'
import loginAPI from './login'
// 引入product文件
import productAPI from './prouct/product'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// 模拟接口延迟响应
Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 产品相关（接口地址与模拟数据的方法名称一一对应）
// Mock.mock('/product/list', 'get', productAPI.getList)
// 可以使用匹配表达式
Mock.mock(/\/product\/list/, 'get', productAPI.getList)
Mock.mock(/\/product\/edit/, 'get', productAPI.getEditInfo)

export default Mock
