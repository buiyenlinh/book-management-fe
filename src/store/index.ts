import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    admin: {},
  },
  mutations: {
    SET_USER : (state, _user:any) => {
      state.user = _user;
    },
    SET_ADMIN: (state, _admin:any) => {
      state.admin = _admin;
    }
  },
  actions: {
    setUser: ({commit}, _user: any) => commit("SET_USER", _user),
    setAdmin: ({commit}, _admin:any) => commit('SET_ADMIN', _admin)
  },
  modules: {},
});
