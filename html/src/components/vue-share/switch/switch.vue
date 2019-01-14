<template>
    <div class="vue-switch" @click="ck" :class="{active:ck}">
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
            ck:this.value
        }
    },
    watch: {
        value:{
            handler(v){
                this.ck=v;
            }
        }
    },  
    methods:{
        ck(){
            this.ck=!this.ck;
            this.$emit("input",this.ck);
            this.callback(this.ck);
            
        }
    }
}
</script>

<style lang="sass">

</style>




