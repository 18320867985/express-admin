<template>
	 <div class="vue-checkbtn">
		<div class="vue-checkbtn-item " :class="{active:checkValue}" data-val="true" @click.prevent="ck">
			<slot>爱心</slot>
		</div>
	</div>
</template>

<script>
	/*
	callback(){}  // 回调函数
	*/
	export default {
		name:"VueCheckbtn",
		props:{
			value:{
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
				  checkValue:this.value
			};
		},
		watch: {
			value:{
				deep:true,
				handler(v){
					this.checkValue=v;	
				}
			}
		},
		methods:{
			ck(){
				this.checkValue=!this.checkValue;
				this.$emit("input",this.checkValue);
				this.callback(this.checkValue);
				
			}
		}
	}

</script>

<style lang="scss">

</style>



