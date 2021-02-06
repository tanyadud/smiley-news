import axios from '@/axios-auth'

// initial state
const state = {
    meta: {},
    title: '',
    isLoading: false
}

// getters
const getters = {
    isLoading (state) {
        return state.isLoading
    },
    getMeta (state) {
        return state.meta
    },
    getTitle(state) {
        return state.title
    }
}

// actions
const actions = {
    setMeta ({commit}, data) {
        commit('LOADING_STATE', true);
        commit('SAVE_META', data);

        setTimeout(() => {
            commit('LOADING_STATE', false);
        }, 500);
    },
    clearMeta({commit}) {
        commit('CLEAR_META');
    }
}


// mutations
const mutations = {
    LOADING_STATE (state, isLoading) {
        state.isLoading = isLoading
    },
    SAVE_META (state, data) {
        state.meta = data.meta;
        state.title = data.title;
    },
    CLEAR_META(state) {
        state.meta = {};
        state.title = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}