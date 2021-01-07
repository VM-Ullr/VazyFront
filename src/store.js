import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

const localToken = localStorage.getItem('token')
let tokenInfo = {}

if (localToken){
  tokenInfo = jwt.decode(localToken)
  //console.log(tokenInfo)
}

export default new Vuex.Store({
  state: {
    status: '',
    token: localToken || '',
    tokenInfo : tokenInfo
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success'
      state.token = token
    },
    set_tokenInfo(state, tokenInfo){
      state.tokenInfo = tokenInfo
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'api/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token)
          commit('set_tokenInfo', jwt.decode(token))
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'api/register', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token)
          commit('set_tokenInfo', jwt.decode(token))
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    tokenInfo : state => state.tokenInfo
  }
});