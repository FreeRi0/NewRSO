import { Commit, createStore } from 'vuex';

export default createStore({
    state: {
        user: false,
    },
    mutations: {
        SET_AUTH: (state: { user: boolean }, auth: boolean) =>
            (state.user = auth),
    },
    actions: {
        setAuth: ({ commit }: { commit: Commit }, auth: boolean) =>
            commit('', auth),
    },
});
