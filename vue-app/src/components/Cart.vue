<template>
    <div id="cart">
        <h1>Cart</h1>
        <div class="item" v-for="(product, index) in getCart" :key="index">
            <div v-on:click="deleteProduct({
            index: index,
            price :product.price
            })">
                <div class="name">{{product.name}}</div>
                <div class="price">{{applyCourse(product.price)}}</div>
                <div class="quantity">{{product.quantity}}</div>
            </div>
        </div>
        Сумма: {{applyCourse(getSum)}}
    </div>
</template>

<script>

    export default {
        name: 'Cart',

        computed: {
            getSum() {
                return this.$store.getters.getSum;
            },

            getCart() {
                return this.$store.getters.getCart;
            }

        },

        methods: {
            applyCourse(price) {
                let course = this.$store.getters.applyCourseGetter;
                return (+course * 1000) * (+price * 1000) / 1000;
            },

            deleteProduct(index) {
                this.$store.commit('deleteProduct', index)
            }
        },
    }
</script>

<style scoped>

    #cart {
        float: right;
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    #cart .name {
        display: flex;
        width: 350px;
        justify-content: center;
    }

    #cart .quantity {
        display: flex;
        width: 50px;
        background-color: red;
        justify-content: center;
    }

    #cart .item {
        width: 350px;
        display: flex;
        padding: 10px;
        background-color: lightgray;
    }

    #cart .price {
        padding-left: 30px;
        width: 75px;
    }

    #cart .name-category {
        border: 1px solid black;
        padding: 5px;

    }

    #cart .name-category .item .name {
        background-color: #fff;
    }

    #cart .name-category .item .price {
        padding: 10px;
        background-color: gray;
    }

</style>
