<template>
  <div class="user-edit">
    <form>
      <h4 class="text-muted">
        <em>修改用户信息</em>
      </h4>
      <hr>
      <div class="form-group">
        <label for="exampleInputEmail1">用户名</label>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">用户类型</label>
        <select name id class="form-control" v-model="editObj.roleId" placeholder="Email">
          <!-- <option
              v-for="(item ,index) of roles"
              :key="index"
              :selected="editObj.roleId===item_id"
              :value="item._id"
          >{{item.name}}</option>-->
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">保存</button>
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
    cancel: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      editObj: this.value
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
.user-edit {
  width: 500px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  .form-group {
    .btn + .btn {
      margin-left: 30px;
    }
  }
}
</style>

