import Vue from 'vue';
import Vuex from 'vuex';
import { moduleA } from './modelA';
import { getActiveList, getActiveType } from '@/service/leancloud';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activities: [],
    types: [],
  },
  mutations: {
    increment(state) {
      // state.count++;
    },
    changeState(state, payload) {
      Object.assign(state, { ...payload });
    },
  },
  actions: {
    async getAllData(context) {
      await context.dispatch('getActivitiesAction');
      await context.dispatch('getTypesAction');
    },

    async getActivitiesAction(context) {
      if (context.state.activities.length > 0) {
        console.log('当前有数据，不请求');
        return false;
      }
      const activities = await getActiveList();
      const tempActities = activities.map((val: any) => {
        return { ...val.attributes, id: val.id };
      });
      context.commit('changeState', { activities: tempActities });
    },

    async getTypesAction(context) {
      if (context.state.types.length > 0) {
        console.log('当前有数据，不请求');
        return false;
      }
      const types = await getActiveType();
      const tempTypes = types.map((val: any) => {
        return { ...val.attributes, id: val.id };
      });
      context.commit('changeState', { types: tempTypes });
    },
  },
  modules: {
    nameA: moduleA,
  },
});
