<template>
  <div class="">
    <bs-header></bs-header>
    <bs-content></bs-content>
  </div>
</template>

<script>
import bsHeader from "./header.vue";
import bsContent from "./content.vue";
export default {
  data() {
    return {};
  },
  components: {
    bsHeader,
    bsContent
  }
};
</script>

<style lang="scss">
.login-cont{
     width: 350px;
     min-height: 300px;
     padding: 30px 30px;
    
     border-radius: 5px;
     border: 1px  solid #ddd;
     box-shadow:  2px 2px 5px #ddd -2px -2px 5px #ddd;
     margin: 0 auto;
     margin-top: 60px;
}

</style>




