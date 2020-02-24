export default {

    actions: {},
    mutations: {
        setCourse: (state, course) => state.course = course,

        setRandomCourse(state) {
            let beforeCourse = state.course;
            let min = 20;
            let max = 80;
            state.course = Math.floor(Math.random() * (max - min + 1)) + min;
            let afterCourse = state.course;


            if (+beforeCourse > afterCourse) {
                state.color = 'red';
            } else {
                state.color = 'green';
            }
        }

    },
    state: {
        course: 50,
        color: ''
    },
    getters: {
        getCourse(state) {
            return state.course;
        }
    },
}
