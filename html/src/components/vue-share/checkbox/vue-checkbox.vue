<template>
		<div class="vue-checkbox" @click="checked" >
			<span class="vue-checkbox-item iconfont icon-vue-checkbox " :class="{'active':ck,disabled:disabled}"   :disabled="disabled">
			</span>
			<span ><slot ></slot></span>
		</div>
</template>

<script>
	export default {
		name:"VueCheckbox",
		props: {
			value:Boolean,
			disabled:{
				type:Boolean,
				default(){
					return false;
				}
			},
	
			callback:{
				type:Function,
				default:function(){}
			}

		},
		data() {
			return {
			ck:this.value
			};
		},
		watch: {
			value:{
				handler(v){
					this.ck=v;
				}
			}
		},
		methods: {
			checked() {
				if(this.disabled){
					return;
				}
				this.ck=!this.ck;
				this.$emit("input",this.ck);
				this.callback(this.ck);
			}
		},
	}

</script>

<style lang="scss"  type="text/css">
	
</style>
