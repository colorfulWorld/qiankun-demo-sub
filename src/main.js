import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import './public-path'
import { appStore } from './utils/app-store'
import utils from './utils/index'

Vue.prototype.$utils = utils
Vue.config.productionTip = false
let instance = null

function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(
    container
      ? container.querySelector('#qiankun-demo-sub')
      : '#qiankun-demo-sub'
  )
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {}

export async function mount(props) {
  appStore(props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title
  next()
})
