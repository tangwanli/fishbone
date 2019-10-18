
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        taskListResData: []
    }
    // mutations: {
    //     setTaskListResData(state,resData) {
    //         state.taskListResData = resData;
    //         console.log(state.taskListResData.count);
    //     }
    // }
});

