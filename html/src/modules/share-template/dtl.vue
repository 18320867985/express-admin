<template>
  <div class="dtl">
      <h4 class="text-muted">
         <a href="javascript:;" class="btn-link"  title="返回上一级">
          <span  @click="cancelBtn" class="glyphicon glyphicon-circle-arrow-left "></span>
          </a>
            <em>
              <slot name="title">参考详细用户信息</slot>
            </em>
            <span @click="cancelBtn" class="close">&times;</span>
          </h4>
          <hr>
     
     <slot :list="list"></slot>
  
       <button type="button" @click="cancelBtn" class="btn btn-default">
          <span class="glyphicon glyphicon-circle-arrow-left "></span> 返回
        </button>
  </div>
</template>

<script>
import { eventBus } from "../../components/eventBus.js";
export default {
  props: {
    cancel: {
      type: Function,
      default: function() {}
    },
    url: {
      type: String,
      default:""
    },
  },
  data() {
    return {
      list:[]
    };
  },
created() {
  eventBus.$on("dtlList",(ids,tab)=>{
      this.readList(ids,tab);
      
  })
},
  methods: {
    cancelBtn() {
      this.cancel();
    },
    
    readList(ids,tab){
    this.$loading("正在加载数据中...");
    this.$http.get(`${this.url}/${ids.join(',')}`).then(ok=>{
      let body=ok.body;
      tab.set("dtl");
      this.list=body.data;
       this.$loading(false);

    }).catch(err=>{
      this.$loading(false);
      this.$info("danger","数据链接失败！");
    });
    }
  }
};
</script>
style:<style lang="scss">

.dtl {
    h4.text-muted{
      font-size: 16px;
      margin-bottom: 10px;
      em{
        margin-left: 20px;
      }
    }
  }


</style>

