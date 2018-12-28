
// vue 插件

import VueCheckbox from "./checkbox/vue-checkbox.vue";
import  vueCheckboxGroup from "./checkbox/vue-checkbox-group.vue";
import VueCheckbtn from "./checkbox/vue-checkbtn.vue";
import VueCheckbtnGroup from "./checkbox/vue-checkbtn-group.vue";

import  VueRadiobox from "./radiobox/vue-radiobox.vue";
import  VueRadiobtn from "./radiobox/vue-radiobtn.vue";

import  VueSwitch from "./switch/switch.vue";

import  VueNumber from "./number/number.vue";

let components=[
	VueCheckbox,
	vueCheckboxGroup,
	VueCheckbtn,
	VueCheckbtnGroup,
	
	VueRadiobox,
	VueRadiobtn,

	VueSwitch,
	VueNumber
];


 export default function(Vue){
	components.forEach(item=>{
		Vue.component(item.name,item);
	});
}


