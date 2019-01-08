
import Vue from "vue";
import App from './app.vue';

const user = {
    init() {
        new Vue({
            render: (h) => h(App),
        }).$mount("#app")
    }
}

export {
    user
}

