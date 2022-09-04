// 基于axios封装网络请求的函数
import store from '@/store'
import axios from 'axios'
// axios.create()创建一个带配置项的自定义axios函数
// myAxios 请求的时候，地址baseURL + url,然后去请求后台
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在请求前会触发一次
  // 它返回给axios内源码，config配置对象（要请求后台的参数都在这个对象上）
  // config配置对象（要请求后台的参数都在这个对象上）
  // 在请求前会触发一次 这个return交给axios源码内 根据配置项发起请求
  // 在发起时，统一携带请求头Authorization和token值
  // 判断，登录页面和注册页面，vuex里无token,而且登录接口和注册接口也不需要携带token(其他页面需要)
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 请求发起前的代码，如果有异常报错，会直接进入这里
  // 返回一个拒绝状态的promise对象（axios留在原地的promise对象状态就为失败结果为error变量值）
  // 此函数类似一个catch函数里面return
  // 口诀：return 非promise对象值，会作为成功的结果 返回给下一个promise对象（axios留在原地）
  // 口诀：return promise对象 这个promise对象状态（状态为失败）它是promise 的类方法reject()
  return Promise.reject(error)
  // 等同于
  // return new Promise((resolve, reject) => {
  //   reject(error)
  // })
}
)
// 导出axios自定义函数
export default myAxios
