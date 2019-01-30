import   "../../libs/autoRun.js";   // must   import
import Vue from "vue";

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// 自定义异步验证器
import { Validator } from 'vee-validate';
// remote 异步验证 例如： v-validate="{required:true,min:4,unique:'admin/user/data/unique'}"
Validator.extend('unique', (value, [httpUlr]) => {
  
     return new Promise((resolve,reject)=>{
       Vue.http.get(`${httpUlr}/${value}`).then(ok=>{
         let body=ok.body;
           resolve(body);

       }).catch(err=>{
         return false;
       });

    });
});

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';
Vue.http.options.emulateJSON = true;

import VueComponent from "../../components/vue-share/index";
Vue.use(VueComponent) ; // 全局注册组件

import * as uiv from 'uiv';
import locale from 'uiv/src/locale/lang/zh-CN';
Vue.use(uiv, {locale,prexfix:"uiv"});

// 过滤器
import filter from "../../components/filter";
Vue.use(filter);

export {index}  from "./index";
export {login}  from "./login";
//export {reg}  from "./reg";

export {user}  from "./user";
export {userrole}  from "./userrole";
export {rotation}  from "./rotation";
export {banner}  from "./banner";
export {seriestype}  from "./seriestype";
export {series}  from "./series";
export {contact}  from "./contact";

export {file}  from "./file";





