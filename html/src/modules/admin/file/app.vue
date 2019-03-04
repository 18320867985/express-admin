<template>
  <div class="file">
    <hr>
     <div class="form-group">
      <div class="col-sm-6">
        <input class="form-control" type="text" name id v-model="file.data">
      </div>
      <div class="col-sm-4">
        <!-- size=300 默认单位为M ; timeout=30 默认单位为秒-->
        <vue-file
           name="vue-file-up"
          btn-class="btn-primary"
          v-model="file"
          url="http://127.0.0.1/file"
          :ok="ok"
          :err="err"
          file-type="image/*"
          :size="300"
          :timeout="30"
          line-class="text-primary"
          btn-text="上传图片"
        ></vue-file>
      </div>
       
    </div>
    <div class="form-group">
         <div class="col-xs-6">
            <img :src="file.data" alt="" style="max-width:100%; max-height:100%; margin:20px; " >
         </div>
        
       </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      file: ""
    };
  },
  methods: {
    ok(data, el) {
      console.log(data);
    },
    err(err, el) {
      console.log(err);
    }
  },
 
};
</script>

<style lang="scss">
</style>


