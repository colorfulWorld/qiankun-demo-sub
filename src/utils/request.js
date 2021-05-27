import axios from 'axios'
import store from '@/store'
import qs from 'querystring'
import { message } from 'ant-design-vue'
import { setState } from '@/utils/app-store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 6000 // 请求超时时间
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      if (config.data && config.data.formData) {
        config.data = qs.stringify({
          ...config.data,
          systemId: 1,
          tokenId
        })
      } else {
        config.data = {
          ...config.data,
          systemId: 1,
          tokenId
        }
      }
    } else {
      config.params = {
        ...config.params,
        systemId: 1,
        tokenId
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * response interceptor
 */
// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 失败
    if (res.success === false) {
      // 过期重新设置
      if (res.code === '9991' || res.code === '9992') {
        message.error('登录已过期，请重新登录')
        setState({ isLogout: true })
      } else {
        message.error(res.msg)
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    } else {
      return res
    }
  },
  (error) => {
    error.msg && message.error(error.msg)
    return Promise.reject(error)
  }
)

export default service
