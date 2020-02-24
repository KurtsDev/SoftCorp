<template>
  <div id="app">
    <ProductList />
    <Cart />
    <Course />
  </div>
</template>

<script>
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Course from "./components/Course";

export default {
  name: 'App',
  components: {
    ProductList,
    Cart,
    Course,
  }
}
</script>

<style>

  #app {
    display: flex;
    justify-content: space-around;
  }

</style>
