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



