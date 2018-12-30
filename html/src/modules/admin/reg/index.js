
import Vue from "vue";
import App from './app.vue';

const reg = {
    init() {
        new Vue({
            render: (h) => h(App),
        }).$mount("#app")
    }
}

export {
    reg
}

