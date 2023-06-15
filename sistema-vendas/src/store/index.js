import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        onLoad: false,
    },
    mutations: {
        isLoaded(state) {
            state.onLoad = true;
        },
        notIsLoaded(state) {
            state.onLoad = false;
        },
    },
    actions: {
        isLoaded({ commit }) {
            commit("isLoaded");
        },
        notIsLoaded({ commit }) {
            commit("notIsLoaded");
        },
    },
});
