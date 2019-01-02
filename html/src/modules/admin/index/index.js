
import Vue from "vue";
import App from './app.vue';

const index = {
    init() {
        new Vue({
            render: (h) => h(App),
        }).$mount("#app")
    }
}

export {
    index
}

