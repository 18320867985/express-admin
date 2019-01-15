<template>
  <div class="add">
    <form>
      <h4 class="text-muted">
        <a href="javascript:;" class="btn-link" title="返回上一级">
          <span @click="cancelBtn" class="glyphicon glyphicon-circle-arrow-left "></span>
        </a>
        <em>
          <slot name="title">添加用户信息</slot>
        </em>
        
        <span @click="cancelBtn" class="close">&times;</span>
      </h4>
      <hr>

      <slot></slot>
      <div class="form-group">
        <slot name="footer-btn" :obj="obj" :cancelBtn="cancelBtn">
          <button type="submit" class="btn btn-primary">添加</button>
        </slot>
      
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    url: {
      type: String,
      default: ""
    },
    cancel: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      obj: this.value
    };
  },
  methods: {
    cancelBtn() {
      this.cancel();
    }
  }
};
</script>

style:<style lang="scss">
.add {
  form {
    h4 {
      font-size: 16px;
      margin-bottom: 10px;
      em {
        margin-left: 20px;
      }
    }
  }
}
</style>

