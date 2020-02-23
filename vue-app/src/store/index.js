import Vue from 'vue';
import Vuex from 'vuex';

import productList from './modules/productList'
import cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      productList,
      cart,
   }
});