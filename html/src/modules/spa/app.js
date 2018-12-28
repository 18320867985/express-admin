import   "../../libs/autoRun.js";   // must   import
import Vue from "vue";
import router from  "./router/index";

// import VueComponent from "../../components/vue-share/index";
// Vue.use(VueComponent) ; // 全局注册组件

import {store} from "./store/index";
import App from "./app.vue";

// import BootstrapVue from 'bootstrap-vue'
// Vue.use(BootstrapVue);


import * as uiv from 'uiv';
import locale from 'uiv/src/locale/lang/zh-CN';
Vue.use(uiv, {locale});


new Vue({
	router,
	store,
	render: (h) => h(App),

}).$mount("#app");


