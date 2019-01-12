
<template>
  <div class="vue-file">
    <a class="vue-file-btn btn" :class="btnClass" name="up" href="javascript:">
      <span class="glyphicon glyphicon-upload"></span>
      {{btnText}}
    </a>
    <input class="fileUp v-hide-text" type="file"  id="fileUp" value name="file"    :accept="fileType"  >
    <!--进度条-->
    <div class="progress-all v-hide">
      <div class="progress-now" :class="lineClass"></div>
      <div class="progress-num">0%</div>
    </div>
  </div>
</template>

<script>
import $ from "../dom.js";
import file from "./file.js";
file($);
export default {
  	name:"VueFile",
  props: {
    value: {},
     url: {
      type: String,
      default: ""
    },
    fileType: {
      type: String,
      default: "*.*"
    },
     size: {
      type: Number,
      default: 100
    },
     timeout: {
      type: Number,
      default: 30
    },
    btnClass: {
      type: String,
      default: "btn-primary"
    },
    lineClass: {
      type: String,
      default: "text-primary"
    },
    btnText: {
      type: String,
      default: "上传图片"
    },
    ok: {
      type: Function,
      default: function() {}
    },
    err: { type: Function,
     default: function() {} }
  },
  mounted() {
    /***文件上传  start***/
    $(".vue-file").VueFile({
      url: this.url, //上传网址
      outTime: this.timeout*1000,
      size: this.size*1024, // 大小 m
      contentType: false,
      success: function(data, el) {
        this.$emit("input", data);
        this.ok(data,el);
      }.bind(this),
      error: function(err, el) {
      //  this.$emit("input", err);
        this.err(err,el);
      }.bind(this)
    });
  }
};
</script>

<style lang="scss">
.vue-file {
  display: flex;
  align-items: center;
  height: 34px;
}

.v-hide-text {
  position: absolute !important;
  display: inline-block !important;
  text-indent: -99999px;
  margin: -2px !important;
  padding: 0 !important;
  width: 0 !important;
  height: 0 !important;
  outline: none !important;
}
.vue-file-btn {
  &.btn-primary {
    background: #2d80f6;
  }
  &.btn-info {
    background: #5bc0de;
  }
  &.btn-success {
    background: #5cb85c;
  }
  &.btn-warning {
    background: #f0ad4e;
  }
  &.btn-danger {
    background: #f05a00;
  }
}

.progress-box {
  position: relative;
  margin-bottom: 10px;
  background: #ccc;
  border: 1px solid #ddd;
  padding: 10px;
}

.progress-box img {
  width: 300px;
  height: 150px;
}

.progress-all {
  position: relative;
  clear: both;
  width: 100%;
  height: 3px;
  margin-top: 1.5px;
  background: #ddd;
}

.progress-now {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  padding: 0;
  &.text-primary {
    background: #2d80f6;
  }
  &.text-info {
    background: #5bc0de;
  }
  &.text-success {
    background: #5cb85c;
  }
  &.text-warning {
    background: #f0ad4e;
  }
  &.text-danger {
    background: #f05a00;
  }
}

.progress-num {
  position: relative;
  top: -8px !important;
  left: 0;
  width: 100%;
  height: 10px;
  text-align: center;
  font-size: 12px;
}
</style>
