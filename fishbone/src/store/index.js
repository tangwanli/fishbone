
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: false
    },
    // mutations: {
    //     loginSuccess(state) {
    //         console.log('dsadsad');
    //         state.login = true;
    //         sessionStorage.setItem('login', true);
    //     }
    // }
});

