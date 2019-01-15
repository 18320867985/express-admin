<template>
  <div class="edit">
    <form>
       <h4 class="text-muted">
            <em>
              <slot name="title">修改用户信息</slot>
              </em>
            <span @click="cancelBtn" class="close">&times;</span>
          </h4>
          <hr>
      <slot :obj="obj" ></slot>
      <div class="form-group">
        <slot name="footer-btn">
          <button type="submit" class="btn btn-primary" @click.prevent="edit">保存</button>
        </slot>
        <button type="button" @click="cancelBtn" class="btn btn-default pull-right">
          <span class="glyphicon glyphicon-share-alt text-warning"></span> 返回
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { eventBus } from "../../../components/eventBus.js";
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
    },
    edit() {
      this.$loading("正在保存中...");
      this.$http.put(`${this.url}`, this.obj).then(
        ok => {
          this.$loading(false);
          var body = ok.body;
          if (body.code) {
            this.cancel();
            this.$notify({
              type: "success",
              content: "修改数据成功！"
            });
             eventBus.$emit("pageList"); // 更新分页
          } else {
            this.$notify({
              type: "danger",
              content: body.data
            });
          }
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

