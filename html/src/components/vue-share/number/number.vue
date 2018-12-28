<template>
    <div class="vue-number" >
       <button class="minus btn" type="button" @click="minus">-</button>
        <input class="num" type="text" v-model="val" @change="change" />
        <button class="plus btn" type="button" @click="plus">+</button>
     </div>
</template>
<script>
export default {
    name:"VueNumber",
    props:{
        value:{
            type:Number
        },
        min:{
            type:Number,
            default:0
        },
          max:{
            type:Number,
            default:1000
        },
        step:{
            type:Number,
            default:1
        }
    },
    data(){
        return {
            val:this.value
        }
    },
    methods:{
        minus(){
            this.val=this.val-this.step;
            this.val=this.val<this.min?this.min:this.val;
            this.$emit("input",this.val);
        },
        plus(){
            this.val=this.val+this.step;
            this.val=this.val>this.max?this.max:this.val;
            this.$emit("input",this.val);
        },
        change(){
            this.val=isNaN(this.val)?this.min:this.val;
            this.val=  this.val>this.max?this.max:this.val;
            this.val=  this.val<this.min?this.min:this.val;
            this.val=this.val<=0?0:this.val;
            this.$emit("input",this.val);
        }
    }
}
</script>
<style lang="scss">

</style>


