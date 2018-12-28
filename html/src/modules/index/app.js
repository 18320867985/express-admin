import   "../../libs/autoRun.js";   // must   import
import Vue from "vue";
import VueComponent from "../../components/vue-share/index";
Vue.use(VueComponent) ; // 全局注册组件

import App from "./app.vue";

new Vue({
	
	render: (h) => h(App),
}).$mount("#app");
