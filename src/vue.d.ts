import { Router } from 'vue-router'
// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $Router: Router
    $setState: any
    $utils: object
  }
}
