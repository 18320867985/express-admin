<template>
  <div class="template-list">
    <slot :list="list" :allcheckBtn="allcheckBtn" :allChcek="allChcek"></slot>
    <!--分页-->
    <vue-paging :page-click="pageClick" text-class="text-center"></vue-paging>
  </div>
</template>
<script>
import { eventBus } from "../../components/eventBus.js";
export default {
  props: {
    value: {
      type: Array,
      default(){
        return [];
      }
    },
    url: {
      type: String,
      default:""
    },
  },

  data() {
    return {
      list: this.value,
      allcheckBtn:{
        ck:false
      },
      // 分页
      pageObj: {
        index: 1, //	当前页
        pageItem: 10, //  每页条数
        allItem: 1, //  总条数
        showCount: 5, //  显示的页码数目
        isShowSkip: true, // 是否显示跳转页
        isShowCount: true, // 是否显示总页数
        isShowAllItems: true, // 是否显示总条目
        selector: ".paging"
      }
    };
  },
  watch: {
    value: {
      deep: true,
      handler: function(v) {
        this.list = v;
      }
    }
  },
  created() {
    eventBus.$on("pageList",()=>{
        this.getUsers(this.pageObj.index||1);
    })
  },
  mounted() {
    // get users
    this.getUsers(1);
  },
  methods: {
    getUsers(i) {
      // 分页
      this.$loading();
      this.$http.get(`${this.url}/${i}/${this.pageObj.pageItem}`, {}).then(
        ok => {
          this.$loading(false);
          var body = ok.body;
          if (body.code) {
            this.list = body.data;
            // this.users =body.data.map((item)=>{
            //   item.bl=false;
            //   return item;
            // });
            this.list.forEach(item => {
              this.$set(item, "bl", false);
            });

            this.pageObj.index = Number(body.index);
            this.pageObj.pageItem = Number(body.pageItem);
            this.pageObj.allItem = Number(body.allItem);
            this.$emit("input", this.list);
            eventBus.$emit("initPage", this.pageObj);
            this.allcheckBtn.ck = false;
          } else {
            this.$notify({
              type: "danger",
              content: body.data
            });
          }
        }
      ).catch(err=>{
         this.$loading(false);
          this.$info("danger","数据链接失败！");
      });
    },
    pageClick(id, end) {
      this.getUsers(id, end);
    },
     
    allChcek(bl) {
    
      if (bl) {
        this.list.forEach(element => {
          element.bl = true;
        });
      } else {
        this.list.forEach(element => {
          element.bl = false;
        });
      }
    }
  }
};
</script>

style:<style lang="scss">
.template-share{
 padding: 0 10px;
 .btn-toolbar {
    margin-top: 15px;
    margin-bottom: 10px;
    padding-right: 10px;
  }
}
.template-list{
  padding-top: 10px;
  .table {
    th,
    td {
      text-align: center;
    }
  }

  table{
    th,td{
  text-align: center;
    }
  }
  form{
    h4{
      font-size: 16px;
      margin-bottom: 10px;
      em{
        margin-left: 20px;
      }
    }
  }
}
</style>

