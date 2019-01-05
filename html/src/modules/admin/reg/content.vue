<template>
  <section>
    <div class="login-cont" @keydown.prevent.enter="validateBeforeSubmit">
      <form @submit.prevent="validateBeforeSubmit">
        <div class="form-group has-feedback" :class="{' has-error':errors.has('user')}">
          <label class="control-label" for="user">用户名:</label>
          <input
            class="form-control"
            type="text"
            name="user"
            id="user"
            v-validate="{required:true,min:4}"
            v-model="user.user"
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
            v-model="user.pwd"
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
            v-model="user.pwd2"
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
        <div class="form-group has-feedback" :class="{'has-error':errors.has('email')}">
          <label class="control-label" for="email">邮箱:</label>
          <input
            class="form-control"
            type="text"
            name="email"
            id="email"
            v-model="user.email"
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
          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="errors.items.length>0"
          >注册</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
     user:{
        user: "",
      pwd: "",
      pwd2: "",
      email: ""
     },
     show:false,
     errText:"注册失败！"
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
       //   alert(JSON.stringify(this.$data));
          this.$http
            .post("/reg/data", this.user)
            .then(
              data => {
                data = data.body;
                if (data.code == 1) {
                  this.show=false;
                  window.location.href = "/admin/index";
                } else {
                  this.show=true;
                  this.$notify({
                    type: "danger",
                    title: "",
                    content: "注册失败！"
                   
                  });
                }
              },
              error => {
                this.$notify({
                type: "danger",
                title: "网络连接失败",
                content: "网络连接失败"
              });
              }
            )
            .catch();
          return;
        }
      });
    }
  },
  created() {}
};
</script>
