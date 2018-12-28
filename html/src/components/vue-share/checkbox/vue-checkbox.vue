<template>
		<div class="vue-checkbox"  >
			<span class="vue-checkbox-item iconfont icon-vue-checkbox " :class="{'active':ck,disabled:disabled}" @click="checked"  :disabled="disabled">
			</span>
			<span @click="checked"><slot ></slot></span>
		</div>
</template>

<script>
	export default {
		name:"VueCheckbox",
		props: {
			value:Boolean,
			disabled:{
				type:Boolean,
				default:false
			},
			check: {
				type: Boolean,
				default:false
			},
		},
		data() {
			return {
				test:"test-slot",
				ck:this.value
				
				
			};
		},
		methods: {
			checked() {
				if(this.disabled){
					return;
				}
				this.ck=!this.ck;
				this.$emit("input",this.ck);
			}
		},
	}

</script>

<style lang="scss"  type="text/css">
	
</style>
