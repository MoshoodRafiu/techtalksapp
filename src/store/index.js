import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    processing: false,
    messages: []
  },
  getters: {
    loggedIn: state => {
      return state.token !== null;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    logUserIn: (state, payload) => {
      localStorage.setItem('access_token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
      state.token = payload.token;
      state.user = payload.user;
    },
    logUserOut: state => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
    },
    setProcessing: (state, payload) => {
      state.processing = payload;
    },
    initMessages: (state, payload) => {
      state.messages = payload;
    },
    pushNewMessage: (state, payload) => {
      state.messages.push(payload);
    }
  },
  actions: {
    pushNewMessage: (context, payload) => {
      context.commit('pushNewMessage', payload);
    },
    initMessages: (context, payload) => {
      context.commit('initMessages', payload);
    },
    setProcessing: (context, payload) => {
      context.commit('setProcessing', payload);
    },
    registerUser: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('/register', payload)
          .then(res => {
            context.commit('logUserIn', res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err)
          });
      })
    },
    logUserIn: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('/login', payload)
          .then(res => {
            context.commit('logUserIn', res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err)
          });
      })
    },
    logUserOut: context => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      return new Promise((resolve, reject) => {
        axios.post('/logout')
          .then(res => {
            context.commit('logUserOut');
            resolve(res);
          })
          .catch(err => {
            context.commit('logUserOut');
            reject(err)
          });
      })
    },
  },
  modules: {
  }
})
