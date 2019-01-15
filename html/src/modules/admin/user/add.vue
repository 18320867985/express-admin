<template>
  <div class="add">
    <form>
      <h4 class="text-muted">
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
        <button type="button" @click="cancelBtn" class="btn btn-default pull-right">
          <span class="glyphicon glyphicon-share-alt text-warning"></span> 返回
        </button>
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
      default:""
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
</style>

