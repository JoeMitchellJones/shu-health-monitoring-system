import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

import _ from 'lodash';
Vue.use(Vuex);

export default new Vuex.Store({
  state: { loggedInUser: {}, error: '' },
  mutations: {
    login(state, user) {
      state.loggedInUser = { ...user };
    },
    showError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async makeAppointment({ commit }, appointment) {
      try {
        await axios.post('/api/appointments', appointment);
        router.push('/');
      } catch (error) {
        commit('showError', error.response.data.message);
      }
    },
    async login({ commit }, loginDetails) {
      try {
        const response = await axios.post(
          'http://localhost:3001/login',
          loginDetails
        );
        commit('login', response.data.user);
        localStorage.setItem('token', response.data.accessToken);
        router.push('/');
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      }
    }
  },
  modules: {}
});
