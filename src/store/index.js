import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' // 保存token字符串
  },
  getters: {
  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState()// 注入持久化插件
  ]
})

// vuex默认保存到内存中，所以刷新所有的值会回归初始化（无法做到持久存储）
// 借助 vuex-persistedstate@3.2.1 这个包能让vuex实现持久化存储
