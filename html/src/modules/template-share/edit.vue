<template>
  <div class="template-edit">
   
       <h4 class="text-muted">
         <a href="javascript:;" class="btn-link"  title="返回上一级">
          <span  @click="cancelBtn" class="glyphicon glyphicon-circle-arrow-left "></span>
          </a>
            <em >
              <slot name="title">修改用户信息</slot>
              </em>
            <span @click="cancelBtn" class="close">&times;</span>
          </h4>
          <hr>
        <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      default:""
    },
    cancel: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
    
    };
  },
  methods: {
    cancelBtn() {
      this.cancel();
    },
   
  }
};
</script>

style:<style lang="scss">
.template-edit{
  width: 500px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  .form-group {
    .btn + .btn {
      margin-left: 30px;
    }
  }
  form{
    h4{
      font-size: 16px;
      margin-bottom: 10px;
      em{
        margin-left: 20px;
      }
    }
  }
}

</style>

