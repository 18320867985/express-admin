<template>
  <section>
    <div class="login-cont" @keydown.prevent.enter="submit">
      <form @submit.prevent="submit">
        <div class="form-group" :class="{'has-error':errors.has('user')}">
          <label class="control-label" for="user">用户名:</label>
          <input
            class="form-control"
            type="text"
            id="user"
            name="user"
            v-validate="{required:true}"
            v-model="user.user"
            placeholder="输入用户名"
          >
          <p v-show="errors.has('user:required')" class="text-danger">用户名不能为空！</p>
        </div>
        <div class="form-group" :class="{'has-error':errors.has('pwd')}">
          <label class="control-label" for="pwd">密码:</label>
          <input
            class="form-control"
            type="password"
            name="pwd"
            v-model="user.pwd"
            v-validate="{required:true}"
            id="pwd"
            placeholder="输入密码"
          >
          <p v-show="errors.has('pwd:required')" class="text-danger">密码不能为空！</p>
        </div>
        <div class="form-group clearfix">
          <div class="pull-left">
            <vue-checkbox v-model="isAuto">记住密码</vue-checkbox>
          </div>
          <div class="pull-right">
            <a href="javascript:;">忘记密码？</a>
          </div>
        </div>
        <div class="form-group">
          <alert type="danger" v-if="show" dismissible @dismissed="show = false">{{errText}}</alert>
        </div>

        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="errors.items.length>0"
            ref="submit"
          >登录</button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: {
        user: "",
        pwd: "",
        isAuto: false
      },
      show: false,
      errText: "用户与密码不对！",
      only: true
    };
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(res => {
        if (res) {
          if (!this.only) {
            return;
          }

          this.$refs.submit.innerText = "登录中...";
          this.$http.post("/login/data", this.user).then(
            data => {
              this.$refs.submit.innerText = "登录";
              this.only = true;
              data = data.body;
              if (data.code === 1) {
                window.location.href = "/admin/index";
              } else {
                this.show = true;
                this.errText = data.data;
                this.only = true;
              }
            },
            err => {
              this.$refs.submit.innerText = "登录";
              this.only = true;
              this.$notify({
                type: "danger",
                title: "网络连接失败",
                content: "网络连接失败"
              });
            }
          );
        }
      });
    }
  }
};
</script>


