<template>
    <div class="ProductList">
        <h1>ProductList</h1>

        <pre>
            "C" - цена в долларах(USD) - вывести в рублях(курс выбрать произвольно),
            "G" - id группы,
            "T" - id товара,
            "P" - сколько единиц товара осталось (параметр, который указан в скобках в названии).
      </pre>

        <div id="category" v-for="(name, key) in getNames" :key="key">
            <div class="name-category"> {{name.G}}</div>
            <br>




            <div v-for="(goodB, key1) in name.B" :key="key1">


                <div v-for="(good, key3) in getGoods" :key="key3">

                    <div class="item" v-if="key1 == good.T">
                        <div class="name">{{name.B[good.T].N}} ({{good.P}})</div>
                        <div class="price"> {{good.C}}</div>



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

            getNamesArr() {
                return this.$store.getters.getNamesArr;
            }

        },

        methods: {
            // getGroups() {
            //     let names = this.getNames();
            //     names.forEach(key, value) {
            //         console.log(value);
            //     }
            //
            // },
        },

    }
</script>

<style scoped>

    #category  {
        display: flex;
        flex-direction: column;
        width: 50%;
    }


    #category .name {
        display: flex;
        width: 330px;
    }

    #category .item {
        display: flex;
        padding: 10px;
        background-color: aliceblue;
        border-bottom: 1px solid black;
    }

    #category .price {
        padding-left: 30px;
        width: 30px;
    }

    #category {
        border: 1px solid black;
        padding: 5px;
        background-color: aquamarine;
    }

    #category .name-category .item .name {

        background-color: #fff;
    }

    #category .name-category .item .price {
        padding: 10px;
        background-color: gray;
    }

</style>
