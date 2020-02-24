<template>
    <div class="ProductList">
        <h1>ProductList</h1>
        <p>добавить/удалить - клик</p>
        <div class="category" v-for="(name, key) in getNames" :key="key">
            <div class="name-category"> {{name.G}}</div>
            <div v-for="(goodB, key1) in name.B" :key="key1">
                <div v-for="(good, key3) in getGoods" :key="key3">

                    <div class="item"
                         v-if="+key1 === +good.T"
                         v-on:click.prevent="buy({
                    name: name.B[good.T].N,
                    quantity: 1,
                    price: good.C,

                    })">
                        <div class="name">{{name.B[good.T].N}} ({{good.P}})</div>
                        <div v-bind:class="colorColumn" class="price">{{applyCourse(good.C)}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductList',

        created() {
            this.$store.dispatch('initProductList');
            this.$store.dispatch('initNamesList');
        },

        computed: {
            getGoods() {
                return this.$store.getters.getGoods;
            },
            getNames() {
                return this.$store.getters.getNames;
            },

            colorColumn() {
                return this.$store.getters.colorColumn;
            }
        },

        methods: {
            applyCourse(price) {
                let course = this.$store.getters.applyCourseGetter;
                return (+course * 1000) * (+price * 1000) / 1000;
            },

            buy(product) {
                this.$store.commit('addProduct', product, {rootState: true});
                this.$store.commit('sumProduct', null, {rootState: true});
            },
        },
    }
</script>

<style scoped>
    .category {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .category .name {
        display: flex;
        width: 330px;
    }

    .category .item {
        display: flex;
        padding: 10px;
        background-color: aliceblue;
        border-bottom: 1px solid black;
    }

    .category .price {
        padding: 10px;
    }

    .category {
        width: 450px;
        border: 1px solid black;
        padding: 5px;
        background-color: aquamarine;
    }

    .category .name-category .item .name {

        background-color: #fff;
    }

    .category .name-category .item .price {
        padding: 10px;
        background-color: gray;
    }

    .red {
        background-color: red;
    }

    .green {
        background-color: green;
    }

</style>
