import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user:{}
  },
  mutations: {
    //存储用户信息
    getUser(state,params){
        state.user = params
    }
  },
  actions: {

  }
})
