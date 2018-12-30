import   "../../libs/autoRun.js";   // must   import
 import Vue from "vue";

import VueComponent from "../../components/vue-share/index";
Vue.use(VueComponent) ; // 全局注册组件

import * as uiv from 'uiv';
import locale from 'uiv/src/locale/lang/zh-CN';
Vue.use(uiv, {locale});

export {login}  from "./login";
export {reg}  from "./reg";
