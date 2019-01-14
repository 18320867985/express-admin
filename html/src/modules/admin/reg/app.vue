<template>
  <div class="">
    <bs-header></bs-header>
    <bscontent></bscontent>
    
  </div>
</template>

<script>
import bsHeader from "./header.vue";
import bscontent from "./content.vue";

export default {
  data() {
    return {};
  },
  components: {
    bsHeader,
    bscontent

  }
};
</script>

<style lang="scss">
.reg-cont{
     width: 400px;
     min-height: 300px;
     padding: 30px 30px;
    
     border-radius: 5px;
     border: 1px  solid #ddd;
     box-shadow:  2px 2px 5px #ddd -2px -2px 5px #ddd;
     margin: 0 auto;
     margin-top: 60px;
}

</style>




