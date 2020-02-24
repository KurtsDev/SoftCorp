<template>
    <div class="course">
        <h1>Course</h1>
        Текущий курс USD
        (обновление 15 секунд)
        <br>
        {{getCourse}}
    </div>
</template>

<script>
    export default {
        name: 'Course',
        computed: {
            getCourse() {
                return this.$store.getters.getCourse;
            },

        },
        methods: {
            setRandomCourse() {
                let self = this;
                setInterval(function () {
                    self.$store.commit('setRandomCourse');
                }, 15000)
            }
        },
        created() {
            this.setRandomCourse();
        }
    }
</script>

<style scoped>

</style>
