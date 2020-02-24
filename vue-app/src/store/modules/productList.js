import axios from 'axios'

export default {

    actions: {
        initProductList({commit}) {
            axios.get('http://localhost:8080/data.json').then(response => {
                commit('setGoods', response.data.Value.Goods);
            })
        },

        initNamesList({commit}) {
            axios.get('http://localhost:8080/names.json').then(response => {
                commit('setNames', response.data);
            })
        }
    },
    mutations: {
        setGoods: (state, goods) => state.goods = goods,
        setNames: (state, names) => state.names = names,
    },
    state: {
        goods: {},
        names: {},
    },
    getters: {
        getGoods(state) {
            return state.goods;
        },
        getNames(state) {
            return state.names;
        },
        applyCourseGetter(state, getters, rootState) {
            return rootState.course.course;
        },

        colorColumn(state, getters, rootState) {
            return rootState.course.color;
        },
    },
}
