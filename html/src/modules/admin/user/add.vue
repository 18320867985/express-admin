<template>
  <div class="user-add">
    <form>
      <h4 class="text-muted">
        <em>添加用户信息</em>
         <span @click="cancelBtn" class="close">&times;</span>
      </h4>

     
      <hr>
      <div class="form-group has-feedback" :class="{' has-error':errors.has('user')}">
        <label class="control-label" for="user">用户名:</label>
        <input
          class="form-control"
          type="text"
          name="user"
          id="user"
          v-validate="{required:true,min:4}"
          placeholder="输入用户名"
        >
        <p class="text-danger" v-show="errors.has('user:required')">用户名不为空！</p>
        <p class="text-danger" v-show="errors.has('user:min')">用户名最小长度为4位！</p>
        <span
          v-show="errors.has('user')"
          class="glyphicon glyphicon-remove form-control-feedback"
          aria-hidden="true"
        ></span>
      </div>

      <div class="form-group has-feedback" :class="{'has-error':errors.has('pwd')}">
        <label class="control-label" for="pwd">密码:</label>
        <input
          class="form-control"
          type="password"
          id="pwd"
          name="pwd"
          ref="pwd"
          placeholder="输入密码"
          v-validate="{ required:true,min:8}"
        >
        <p class="text-danger" v-show="errors.has('pwd:required')">密码不为空！</p>
        <p class="text-danger" v-show="errors.has('pwd:min')">密码最小长度为8位！</p>
        <span
          v-show="errors.has('pwd')"
          class="glyphicon glyphicon-remove form-control-feedback"
          aria-hidden="true"
        ></span>
      </div>

      <div class="form-group has-feedback" :class="{'has-error':errors.has('pwd2')}">
        <label class="control-label" for="pwd2">确认密码:</label>
        <input
          class="form-control"
          type="password"
          name="pwd2"
          id="pwd2"
          v-validate="{ required:true,confirmed:'pwd'}"
          data-vv-as="pwd"
          placeholder="输入确认密码"
        >
        <p class="text-danger" v-show="errors.has('pwd2:required')">密码不为空！</p>
        <p class="text-danger" v-show="errors.has('pwd2:confirmed')">两次密码不相同！</p>
        <span
          v-show="errors.has('pwd2')"
          class="glyphicon glyphicon-remove form-control-feedback"
          aria-hidden="true"
        ></span>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">用户类型</label>
        <select name id class="form-control" v-model="addObj.roleId">
          <option value>==选择类型==</option>
          <option v-for="(item ,index) of roles" :key="index" :value="item._id">{{item.name}}</option>
        </select>
      </div>

      <div class="form-group has-feedback" :class="{'has-error':errors.has('email')}">
        <label class="control-label" for="email">邮箱:</label>
        <input
          class="form-control"
          type="text"
          name="email"
          id="email"
          v-validate="'required|email'"
          placeholder="输入邮箱"
        >
        <p class="text-danger" v-show="errors.has('eamil:required')">邮箱不为空！</p>
        <p class="text-danger" v-show="errors.has('email:email')">邮箱格式不对！</p>
        <span
          v-show="errors.has('email')"
          class="glyphicon glyphicon-remove form-control-feedback"
          aria-hidden="true"
        ></span>
      </div>

      <div class="form-group">
        <alert type="danger" v-if="show" dismissible @dismissed="show = false">{{errText}}</alert>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">添加</button>
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
      addObj: this.value
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
.user-add {
  width: 500px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

