import   "../../libs/autoRun.js";   // must   import
import Vue from "vue";

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';
Vue.http.options.emulateJSON = true;

import VueComponent from "../../components/vue-share/index";
Vue.use(VueComponent) ; // 全局注册组件

import * as uiv from 'uiv';
import locale from 'uiv/src/locale/lang/zh-CN';
Vue.use(uiv, {locale});

// 过滤器
import filter from "../../components/filter";
Vue.use(filter);

export {index}  from "./index";
export {login}  from "./login";
export {reg}  from "./reg";
export {user}  from "./user";
