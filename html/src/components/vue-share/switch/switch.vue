<template>
    <div class="vue-switch" @click="ck" :class="{active:bl}">
		<div class="vue-switch-handler">
		</div>
	</div>
</template>
<script>
export default {
    name:"VueSwitch",
    props:{
         value:{
             type:Boolean,
             default:false
         },
         callback:{
             type:Function,
             default:function(){}
         }
    } ,
    data(){
        return{
            bl:this.value
        }
    },
    methods:{
        ck(){
            this.bl=!this.bl;
            this.$emit("input",this.bl);
            this.callback(this.bl);
            
        }
    }
}
</script>

<style lang="sass">

</style>




