<template>
  <div class="add">
        <h4 class="text-muted">
          <a href="javascript:;" class="btn-link" title="返回上一级">
            <span @click="cancelBtn" class="glyphicon glyphicon-circle-arrow-left"></span>
          </a>
          <em>
            <slot name="title">添加用户信息</slot>
          </em>
          <span @click="cancelBtn" class="close">&times;</span>
        </h4>
        <hr>
        <slot></slot>           
  </div>
</template>

<script>
import { eventBus } from "../../components/eventBus.js";
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
    },
    
  },
  data() {
    return {
      obj: this.value
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

