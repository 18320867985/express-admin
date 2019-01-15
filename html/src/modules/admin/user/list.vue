<template>
  <div>
    <slot :list="users" :allcheckBtn="allcheckBtn" :allChcek="allChcek"></slot>
    <!--分页-->
    <vue-paging :page-click="pageClick" text-class="text-center"></vue-paging>
  </div>
</template>
<script>
import { eventBus } from "../../../components/eventBus.js";
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
      users: this.value,
      // 分页
      pageObj: {
        index: 1, //	当前页
        pageItem: 2, //  每页条数
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
        this.users = v;
      }
    }
  },
  created() {
    eventBus.$on("pageList",()=>{
        this.getUsers(this.pageObj.index);
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
            this.users = body.data;
            // this.users =body.data.map((item)=>{
            //   item.bl=false;
            //   return item;
            // });
            this.users.forEach(item => {
              this.$set(item, "bl", false);
            });

            this.pageObj.index = Number(body.index);
            this.pageObj.pageItem = Number(body.pageItem);
            this.pageObj.allItem = Number(body.allItem);
            this.$emit("input", this.users);
            eventBus.$emit("initPage", this.pageObj);
            this.allcheckBtn = false;
          } else {
            this.$notify({
              type: "danger",
              content: body.data
            });
          }
        }
      ).catch(err=>{
         this.$loading(false);
          this.$notify({
            type: "danger",
            content: "连接失败"
          });
      });
    },
    pageClick(id, end) {
      this.getUsers(id, end);
    },
     
    allChcek(bl) {
    
      if (bl) {
        this.users.forEach(element => {
          element.bl = true;
        });
      } else {
        this.users.forEach(element => {
          element.bl = false;
        });
      }
    }
  }
};
</script>

style:<style lang="scss">
</style>

