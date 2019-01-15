<template>
  <div class="read">
      <h4 class="text-muted">
            <em>
              <slot name="title">参考详细用户信息</slot>
            </em>
            <span @click="cancelBtn" class="close">&times;</span>
          </h4>
          <hr>
     
     <slot :list="list"></slot>
     <!-- <div class="list-group" v-for="(item,index) of list" :key="index">
        <div class="list-group-item  clearfix">
          <div class="col-xs-6 list-group-item-text">
                <label for="">用户Id:</label>
                <span>{{item._id}}</span>
          </div>
            <div class="col-xs-6 list-group-item-text">
                 <label for="">用户名:</label>
                <span>{{item.name}}</span>
          </div>
        </div>
         <div class="list-group-item  clearfix">
          <div class="col-xs-6 list-group-item-text">
                <label for="">用户类型:</label>
                <span>{{(item.roleId&&item.roleId.name)}}</span>
          </div>
            <div class="col-xs-6 list-group-item-text">
                 <label for="">创建时间:</label>
                <span>{{item.createDate|date}}</span>
          </div>
        </div>
    
     </div>
       -->

       <button type="button" @click="cancelBtn" class="btn btn-default">
          <span class="glyphicon glyphicon-share-alt text-warning"></span> 返回
        </button>
  </div>
</template>

<script>
import { eventBus } from "../../../components/eventBus.js";
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
  eventBus.$on("readList",(ids)=>{
      this.readList(ids);
  })
},
  methods: {
    cancelBtn() {
      this.cancel();
    },
    
    readList(ids){
      this.$loading();
    this.$http.get(`${this.url}/${ids.join(',')}`).then(ok=>{
      let body=ok.body;
      console.log(body)
      this.list=body.data;
       this.$loading(false);

    }).catch(err=>{
      this.$loading(false);
          this.$notify({
            type: "danger",
            content: "连接失败"
          });
    });
    }
  }
};
</script>
style:<style lang="scss">

</style>

