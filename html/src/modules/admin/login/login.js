
import Vue from "vue";
import App from './app.vue';

const login = {
    init() {
        new Vue({
            render: (h) => h(App),
        }).$mount("#app")
    }
}

export {
    login
}

