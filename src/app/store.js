import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const defaultState = () => ({
    // state
    userData: []
})

export default new Vuex.Store({
    state: defaultState,
    getters: {
        userData: state => state.userData
    },
    mutations: {
        LOGIN: (state, data) => {
            return axios.get('/api/person', {
            params: {
                email: data.email,
                pass: data.pass
            }
            }).then(resp => {
                console.log(resp.data)
            state.defaultState = resp.data[0]
            return true
            }).catch( err => {
                console.error(err.response.data)
                return false
            })
        }
    },
    actions: {
        login: (context, data) => {
            return context.commit('LOGIN', data).then(boo => {
                return boo
            })
        }
    }
})