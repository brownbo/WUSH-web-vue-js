import Vue from 'vue';
import Vuex from 'vuex';
import { moduleA } from './modelA';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '梁帅最帅',
    sex: '男',
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    async increment(context) {
      context.commit('increment');
    },
  },
  modules: {
    nameA: moduleA,
  },
});
