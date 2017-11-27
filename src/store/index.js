import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
            axios.post("/users/checkLogin").then(res => {
                var data = res.data

                if (data.status == 0) {
                    state.user = data.result
                }
            })
        }
    }
})