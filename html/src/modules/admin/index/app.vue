<template>
  <div>
    <!--头像图-->
    <!-- <img class="head-img" src="/static/images/head.png"   alt="头像图"> -->
    <!-- <span class="iconfont icon-yonghu-copy"  data-toggle="tooltip"
    data-placement="left" title="admin"></span>-->
    <span class="text-white">{{name}}</span>

    <!-- <span class="iconfont icon-mima"></span> -->
    <span
      class="iconfont icon-tuichu"
      @click="logout"
      data-toggle="tooltip"
      data-placement="left"
      title="退出登录"
    ></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:""
    };
  },
  methods: {
    logout() {
      this.$confirm({
        title: "退出登录",
        content: "确认退出登录？"
      })
        .then(() => {
          this.$http
            .post("logout/data")
            .then(data => {
              data = data.body;
              if (data.code == 1) {
                window.location.href = "/login";
              } else {
              }
            })
            .catch();
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.$http.get("admin/index/data").then(data => {
      data = data.body;
      if (data.code == 1) {
      this.name=data.data.name
      } else {
      }
    });
  }
};
</script>



