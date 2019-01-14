<template>
  <div class="user">
    <div class="container-fluid-12">
      <div v-show="tab.index">
        <div class="btn-toolbar clearfix">
          <div class="btn-group pull-left"></div>
          <div class="btn-group pull-right">
            <button class="btn btn-default btn-sm" @click="addBtn">
              <span class="text-primary glyphicon glyphicon-plus"></span> 添加
            </button>
            
            <button class="btn btn-default btn-sm"  @click="editBtn">
              <span class="glyphicon glyphicon-edit text-warning"></span> 修改
            </button>
            <button class="btn btn-default btn-sm" @click.prevent="delAll()">
              <span class="glyphicon glyphicon-trash text-danger"></span> 删除
            </button>
          </div>
        </div>
        <vue-list v-model="users"></vue-list>
      </div>

      <div v-show="tab.edit">
        <vue-edit :cancel="editCancel"></vue-edit>
      </div>

       <div v-show="tab.add">
        <vue-add :cancel="addCancel"></vue-add>
      </div>
    </div>


  </div>
</template>

<script>
import vueList from "./list.vue";
import vueEdit from "./edit.vue";
import vueAdd from "./add.vue";

export default {
  data() {
    return {
      users: [],
      editOpen: false,
      addOpen: false,
      editObj: {
        _id: "",
        name: "",
        roleId: ""
      },
      tab: {
        index: true,
        edit: false,
        add:false,
        set:v=>{
         v=typeof v !=="string"?"index":v;

          for(name in this.tab){
               console.log(name)
            if( typeof  this.tab[name]==="boolean"){
              if(name==v){
                this.tab[name]=true;
                }else{
                  this.tab[name]=false;
                }
              }
          }
        }
      }

      // addObj: {
      //   name: "",
      //   pwd: "",
      //   pwd2: "",
      //   email: "",
      //   roleId: ""
      // },

      // roles: [],
      // allcheckBtn: false,
    };
  },

  mounted() {
    // get roles
    // this.$http.get("admin/userRole/data", {}).then(
    //   ok => {
    //     var body = ok.body;
    //     if (body.code) {
    //       this.roles = body.data;
    //     } else {
    //       this.$notify({
    //         type: "danger",
    //         title: "error",
    //         content: body.data
    //       });
    //     }
    //   },
    //   err => {
    //     this.$notify({
    //       type: "danger",
    //       title: "连接失败",
    //       content: "连接失败"
    //     });
    //   }
    // );
  },
  methods: {
    // del
    del(id, index) {
      this.$confirm({
        content: "确认删除数据？"
      })
        .then(ok => {
          this.$http.delete(`admin/user/data/${id}`).then(
            ok => {
              var body = ok.body;
              if (body.code) {
                this.users.splice(index, 1);

                this.$notify({
                  type: "success",
                  content: "删除数据成功！"
                });
              } else {
                this.$notify({
                  type: "danger",
                  content: "删除数据失败！"
                });
              }
            },
            err => {
              this.$notify({
                type: "danger",
                content: "连接失败"
              });
            }
          );
        })
        .catch(err => {
          // cancel
        });
    },
    editBtn(item) {
      this.tab.set("edit");
    },
    edit() {
      this.$http.put(`admin/user/data`, this.editObj).then(
        ok => {
          var body = ok.body;
          this.editOpen = false;
          if (body.code) {
            this.getUsers(this.pageObj.index);
            this.$notify({
              type: "success",
              content: "修改数据成功！"
            });
          } else {
            this.$notify({
              type: "danger",
              content: body.data
            });
          }
        },
        err => {
          this.$notify({
            type: "danger",
            content: "连接失败"
          });
        }
      );
    },

    delAll() {
      let fo = this.users.filter(item => {
        return item.bl === true;
      });
      if (fo.length <= 0) {
        this.$alert({
          title: "提示",
          content: "<strong class='text-danger'>还没选择数据!</strong>",
          html: true
        }).catch(err => {});
        return;
      }
      this.$confirm({
        content: "确认删除数据？"
      })
        .then(ok => {
          let listId = this.users
            .filter(item => {
              return item.bl === true;
            })
            .map(item => {
              return item._id;
            });
          this.$http
            .delete(`admin/user/data/${listId.join(",")}`, { name: 123 })
            .then(
              ok => {
                var body = ok.body;
                if (body.code) {
                  this.users = this.users.filter(item => {
                    return listId.some(v => {
                      return v != item._id;
                    });
                  });
                  this.$notify({
                    type: "success",
                    content: "删除数据成功！"
                  });
                } else {
                  this.$notify({
                    type: "danger",
                    content: "删除数据失败！"
                  });
                }
              },
              err => {
                this.$notify({
                  type: "danger",
                  content: "连接失败"
                });
              }
            );
        })
        .catch(err => {});
    },

    addBtn() {
      this.tab.set("add");
    },
    addCancel(){
      this.tab.set();
    },
     editCancel(){
      this.tab.set();
    }
  },
  components: {
    vueList,
    vueEdit,
     vueAdd
  }
};
</script>
<style lang="scss">
.user {
  padding-bottom: 20px;
  .btn-toolbar {
    margin-bottom: 10px;
    padding-right: 10px;
  }
  padding-top: 20px;
  .table {
    th,
    td {
      text-align: center;
    }
  }
}
</style>



