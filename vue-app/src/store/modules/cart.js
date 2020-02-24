export default {

    actions: {},

    mutations: {
        addProduct(state, product) {
            state.cart.push(product);
        },
        deleteProduct(state, params) {
          state.cart.splice(params.index, 1);
          state.sum -= params.price
        },

        sumProduct(state) {
            let sum = 0;
           state.cart.forEach(function (item) {
               sum = sum + item.price;
           });

            state.sum = sum;
        },
    },
    state: {
        cart: [],
        sum: 0
    },
    getters: {

        getCart: (state) => {
            return state.cart;
        },

        getSum: (state) => {
            return state.sum;
        },
    },
}
