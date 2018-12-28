
	 import Vue from  "vue";
	 import App from "./app.vue";
	
	const test={
	 
	 init(){
			
			new Vue({
			render: (h) => h(App),
			}).$mount("#app")
			
	
	 }
	 
 }
 
 export{
	 test
 }