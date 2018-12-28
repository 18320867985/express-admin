<template>
	<div class="vue-checkbtn-group">
			<div class="vue-checkbtn-item " :class="{active:item.bl}"  v-for="item of list"  :key="item.key" :data-val="item.value" @click="ck(item)">{{item.key}}</div>
	</div>
</template>

<script>
	/*
	callback(){}  // 回调函数
	*/

 
	export default {
		name:"VueCheckbtnGroup",
		props:{
			list:{
				type:Array,
			
			},
			value:{
				type:Array
			}
		
		},
		data() {
			return {
				  ckList:this.value||[],
	
					
			};
		},
		methods:{
			ck(item){
				item.bl=!item.bl;
				this.ckList=[];
					this.list.forEach(o=>{
						if(o.bl){
							this.ckList.push(o.value);
						}
					})
				
				this.$emit("input",this.ckList);
	
			},
			mapList(){
				
				this.value=this.value||[];
				this.value.forEach(item=>{
					if(!item.bl){
						item.bl=false;
					}
					return this.vlaue
				});
				
			},
			testFn(){
				return{
					name:"1234"
				}
			}
		},
		mounted(){
	
			var arrs=[];
				this.list.forEach(item => {
				if (item.bl||this.ckList.filter(o=>o==item.value).length>0) {
					arrs.push(item.value);
					item.bl=true;
				}
			});
			this.ckList=arrs;
			this.$emit('input', this.ckList);
			
		},
	}
</script>

<style>

</style>
