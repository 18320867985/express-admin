
// vue 插件

import VueCheckbox from "./checkbox/vue-checkbox.vue";
import  vueCheckboxGroup from "./checkbox/vue-checkbox-group.vue";
import VueCheckbtn from "./checkbox/vue-checkbtn.vue";
import VueCheckbtnGroup from "./checkbox/vue-checkbtn-group.vue";

import  VueRadiobox from "./radiobox/vue-radiobox.vue";
import  VueRadiobtn from "./radiobox/vue-radiobtn.vue";

import  VueSwitch from "./switch/switch.vue";

import  VueNumber from "./number/number.vue";

import  VueFile from "./file/file.vue";

import  VuePaging from "./paging/paging.vue";

let components=[
	VueCheckbox,
	vueCheckboxGroup,
	VueCheckbtn,
	VueCheckbtnGroup,
	
	VueRadiobox,
	VueRadiobtn,

	VueSwitch,
	VueNumber,

	VueFile,

	VuePaging
];


// 实例方法
import  info from "./info/info";
import  loading from "./loading/loading";

 export default function(Vue){
	components.forEach(item=>{
		Vue.component(item.name,item);
	});

	
	Vue.prototype.$info=info;

	Vue.prototype.$loading=loading;
}

