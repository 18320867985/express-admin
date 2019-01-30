
import Vue from "vue";
import App from './app.vue';

const seriestype= {
    init() {
      var vm=  new Vue({
            render: (h) => h(App),
        }).$mount("#app");
    }

}

export {
    seriestype
}

