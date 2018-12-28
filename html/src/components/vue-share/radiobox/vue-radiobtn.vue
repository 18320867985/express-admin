<template>
 <div class="vue-radiobtn">
    <div class="vue-radiobtn-item" v-for=" item of list "  :key="item.key" :class="{active:item.value===radioValue}" :data-val="item.value" @click="ck(item)">{{item.key}}</div>
</div>  
</template>
<script>
export default {
  name: "VueRadiobtn",
  props: {
    list: {
      type: Array
    },
    value: {}
  },
  data() {
    return {
      radioValue: this.value
    };
  },
  methods: {
    ck(item) {
      this.radioValue = item.value;
      this.$emit("input", this.radioValue);
    }
  }
};
</script>
<style lang="scss">
</style>
