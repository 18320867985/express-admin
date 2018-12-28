<template>
	<div class="vue-radiobox" >
		<span class="vue-radiobox-item iconfont"  v-for="item in list " :class="{active:item.value==checkItem,disabled:item.disabled}"  v-bind:key="item.key" @click="ck(item)">{{item.key}}</span>
	</div>
</template>

<script>
	/*
	list:[
		{
			key:"js",     // 键
			value:"js",      // 值
			disabled:false  // 禁用
		}
		,

			{
			key:"jquery",
			value:"jquery",
			disabled:false

		}
	]
	
	选中的值为 v-model

	
	*/
	export default {
		name:"VueRadiobox",
		props:{
			list:{
				type:Array
			},
			value:{
			
			}
		},
		data() {
			return {
				radioGroup:false,
				checkItem:this.value,
				isDisabled:false
			};
		},
		methods:{
			ck(item){
				if(item.disabled){
					return;
				} 
				if(this.isDisabled){
					return;
				}
				
				this.checkItem=item.value;
				this.$emit("input",this.checkItem);
			}
		},
		mounted(){
			
			this.list.forEach(item=>{
				if(this.list.filter(item=>item.disabled===true).length>0&&item.value==this.checkItem&&item.disabled){
					this.isDisabled=true;
				}
			});
			
		}
	}
</script>

<style>


</style>

