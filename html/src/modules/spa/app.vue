<template>
  <div id="app" class="container" style="padding:20px;">
    <h1>{{name}}</h1>
    <h3>Router</h3>

    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/" active-class="active"  class="nav-link" exact>home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/router1" active-class="active"  class="nav-link">router1</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/router2"  class="nav-link" active-class="active">router2</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "多页+单页应用 快速开发应用 "
    };
  },
  created() {
    this.$store.dispatch("at", 1000);
  }
};
</script>




