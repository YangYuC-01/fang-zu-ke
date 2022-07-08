import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'zufangTOKEN'
})

export default new Vuex.Store({
  state: {
    token: null,
    nowCity: [{ label: '北京', id: 'AREA|88cff55c-aaa4-e2e0' }]
  },
  getters: {

  },
  mutations: {
    getAdd (state, payload) {
      state.token = payload
    },
    setNowCity (state, payload) {
      state.nowCity[0].label = payload.label
      state.nowCity[0].id = payload.id
    }
  },
  actions: {
  },
  modules: {

  },
  plugins: [vuexLocal.plugin]
})
