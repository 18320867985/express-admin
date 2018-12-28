<template>
	
	<div class="vue-checkbox-group"  >
			<div class="vue-checkbox-group-item" v-for="item in list" :key="item.value" @click="ck(item)" >
				<span class="vue-checkbox-item iconfont " :class="{'active':item.bl,disabled:item.disabled}"  :data-val="item.value" ></span>
				<span class="vue-checkbox-text" :class="{disabled:item.disabled}">{{item.key}}</span>
			</div>
	</div>
		
</template>

<script>
import VueCheckbox from './vue-checkbox.vue';

export default {
    name: 'VueCheckboxGroup',
    props: {
        list: {
            type:Array
        },
		value:{
			type:Array
		}
    },
    /*list:[
			{
			key:"js",     // 键
			value:"js",      // 值
			bl:false,  		// 是否选择
			disabled:false  // 禁用
		}
	*/

    data() {
        return {
            ckList:this.value||[]
        };
    },
    methods: {
        ck(item) {
			if(item.disabled){
				return;
			}
            item.bl = !item.bl;
            this.ckList = [];
            this.list.forEach(item => {
                if (item.bl) {
                    this.ckList.push(item.value);
                }
            });

            this.$emit('input', this.ckList);
        }
    },
    components: {
        VueCheckbox
    },
	
    mounted: function() {
		var arrs=[];
		this.ckList=arrs;
        this.$emit('input', this.ckList);
    
    }
    
    
	
};
</script>

<style>
	
</style>
