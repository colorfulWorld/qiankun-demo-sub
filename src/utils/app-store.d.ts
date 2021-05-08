import store from '@/store'
import Vue from 'vue'

interface store {
  name?: string
  owner?: string
  setGlobalState?(params: any): void
}

/**
 * @name 声明一个常量准备将props内的部分内容储存起来
 */
const STORE: store = {}

/**
 * @name 启动qiankun应用间通信机制
 * @param {Object} props 官方通信函数
 * @description 注意：主应用是从qiankun中导出的initGlobalState方法，
 * @description 注意：子应用是附加在props上的onGlobalStateChange, setGlobalState方法（只用主应用注册了通信才会有）
 */
const appStore = (props: any) => {
  /**
   * @name 监听主应用传参token 等数据，并存入store
   */
  if (props?.appBaseInfo) {
    store.dispatch('SetYameSource', props.appBaseInfo.yameSource)
  }

  /**
   * @name 监听应用间通信，并存入store
   */
  props?.onGlobalStateChange?.((value: any, prev: string) => {
    // value: 变更后的状态; prev 变更前的状态
    console.log(`子应用[onGlobalStateChange - ${props.name}]:`, value, prev)
    if (value?.storeInfo?.token) {
      store.dispatch('SetToken', value.storeInfo.token)
      store.dispatch('SetUserInfo', value.storeInfo)
    }
  }, true)
  /**
   * @name 改变并全局广播新消息
   */
  props?.setGlobalState?.({
    ignore: props.name,
    msg: `来自${props.name}动态设定的消息`
  })

  /**
   * @name 将你需要的数据存起来，供下面setState方法使用
   */
  STORE.setGlobalState = props?.setGlobalState
  STORE.name = props.name
}

const setState = (data: object) => {
  if (typeof data !== 'object') {
    throw Error('data必须是对象格式')
  }
  STORE.setGlobalState?.({
    ignore: STORE.name,
    ...data
  })
}
Vue.prototype.$setState = setState

export { appStore, setState }
