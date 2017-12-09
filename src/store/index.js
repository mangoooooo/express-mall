import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showLoginForm: false,
        user: null
    },
    mutations: {
        updateLoginForm(state, status) {
            state.showLoginForm = status
        },
        updateUserInfo(state, data) {
            state.user = data
        },
        checkLogin(state) {
            api.checkLogin().then(res => {
                console.log('check login ::')
                console.log(res)
                state.user = res
            }).catch(err => {
                console.log('check login ::')
                console.log(err)
            })
        }
    }
})