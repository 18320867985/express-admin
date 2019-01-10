<template>
	<!-- 分页-->
<div class="paging text-center"></div>
</template>
<script>
import $ from './$.js';
import paginger from './paging.js';
var  paging=paginger($);
export default {
     props:{
         pageClick:{
             type:Function,
             default:function(){}
         },
         pageObj:{
             type:Object,
             default:function(){
                    return{
                    index: 1, //	当前页
                    pageItem: 20, //  每页条数
                    allItem: 100, //  总条数
                    showCount: 5, //  显示的页码数目
                    selector: ".paging", //分页父元素
                    isShowSkip: true, // 是否显示跳转页
                    isShowCount: true, // 是否显示总页数
                    isShowAllItems: true, // 是否显示总条目
             }
         }}
     },
    mounted() {
        
           // 分页
        paging.init(this.pageObj);
        //     {
        //     index: 1, //	当前页
        //     pageItem: 10, //  每页条数
        //     allItem: 100, //  总条数
        //     showCount: 5, //  显示的页码数目
        //     selector: ".paging", //分页父元素
        //     isShowSkip: true, // 是否显示跳转页
        //     isShowCount: true, // 是否显示总页数
        //     isShowAllItems: true, // 是否显示总条目
        // }
        //);

        //点击事件
        $(document).on("paging_click", function (event, id) {
        
             //id 当前点击的元素的页码	
          //  alert("第" + id + "页");
            this.pageClick(id)
           
        }.bind(this));
    },
    
}

</script>

<style lang="scss">

</style>


