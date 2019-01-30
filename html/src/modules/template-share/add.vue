<template>
  <div class="template-add">
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
.template-add {
  width: 600px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  hr {
    margin: 10px 0 10px 0;
  }

  h4 {
    font-size: 15px;

    em {
      margin-left: 20px;
    }
  }
}
</style>

