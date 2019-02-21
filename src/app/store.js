import Vue from 'vue'
import Vuex from 'vuex'

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
        //
    },
    actions: {

    }
})