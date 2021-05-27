const user = {
  state: {
    token: '',
    userInfo: '', //当前用户信息
    yameSource: ''
  },
  getters: {
    token: (state) => {
      return state.token
    },
    userInfo: (state) => {
      return state.userInfo
    },
    yameSource: (state) => {
      return state.yameSource
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登出
    Logout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', '')
    },
    SetToken({ commit }, state) {
      commit('SET_TOKEN', state)
    },
    SetUserInfo({ commit }, state) {
      commit('SET_USERINFO', state)
    }
  }
}

export default user
