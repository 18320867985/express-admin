<template>
  <div class="user">
    <!-- 主列表模块-->
    <div class="tab-slide" :class="{'active':tab.index}">

      <!--操作按钮组-->
      <div class="btn-toolbar clearfix">
        <div class="btn-group pull-left"></div>
        <div class="btn-group  pull-right" >
          <button class="btn btn-default btn-sm" @click="addBtn">
            <span class="text-primary glyphicon glyphicon-plus"></span> 添加
          </button>

            <button class="btn btn-default btn-sm" @click="dtlBtn">
            <span class="text-info glyphicon glyphicon-list-alt"></span> 查看
          </button>
          
          <button class="btn btn-default btn-sm" @click="editBtn">
            <span class="glyphicon glyphicon-edit text-warning"></span> 修改
          </button>

          <button class="btn btn-default btn-sm" @click.prevent="delBtn()">
            <span class="glyphicon glyphicon-trash text-danger"></span> 删除
          </button>
        </div>
      </div>

      <!-- 组件-->
      <vue-list v-model="users" :url="httpUlr.list">
        <template slot-scope="scope">
          <table class="table table-hover table-bordered">
            <thead>
              <tr class="text-center">
                <th>
                  <!-- <vue-checkbtn :callback="scope.allChcek" v-model="scope.allcheckBtn">
                    <span class="glyphicon glyphicon-check"></span>
                  </vue-checkbtn> -->
                  <vue-checkbox v-model="scope.allcheckBtn.ck" :callback="scope.allChcek"></vue-checkbox>
                </th>
                <th>编号</th>
                <th>用户名</th>
                <th>类型</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index)  of scope.list" :key="index">
                <td>
                  <vue-checkbox v-model="item.bl"></vue-checkbox>
                </td>
                <td>{{ item._id}}</td>
                <td>{{ item.name}}</td>
                <td>{{ item.roleId&&item.roleId.name}}</td>
                <td>{{ item.createDate|date}}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-list>
    </div>

    <!--编辑模块-->
    <div class="tab-slide" :class="{'active':tab.edit}">
      <!--组件-->
      <vue-edit :cancel="editCancel" v-model="editObj" :url="httpUlr.edit">
        <template slot="title">修改用户信息</template>
        <template slot-scope="scope">
          <div class="form-group">
            <label for="exampleInputEmail1">用户名:{{scope.obj.name}}</label>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">用户类型</label>
            <select name id class="form-control" v-model="scope.obj.roleId" placeholder="Email">
              <option
                v-for="(item ,index) of roles"
                :key="index"
                :selected="scope.obj.roleId===item_id"
                :value="item._id"
              >{{item.name}}</option>
            </select>
          </div>
        </template>
      </vue-edit>
    </div>

    <!--添加模块-->
    <div class="tab-slide" :class="{'active':tab.add}">

       <!--组件-->
      <vue-add :cancel="addCancel" :url="httpUlr.add">
        <template slot="title">添加用户信息</template>
        <template slot-scope="scope">
          <p>{{scope.obj}}</p>
        </template>
      </vue-add>
    </div>

    <!--详细列表模块-->
    <div class="tab-slide" :class="{'active':tab.dtl}">

       <!--组件-->
      <vue-dtl :cancel="dtlCancel" :url="httpUlr.dtl">
        <template slot="title">查看详细用户信息</template>
        <template slot-scope="scope">
          <div class="list-group" v-for="(item,index) of scope.list" :key="index">
            <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>用户Id:</label>
                <span>{{item._id}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>用户名:</label>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>用户类型:</label>
                <span>{{(item.roleId&&item.roleId.name)}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>创建时间:</label>
                <span>{{item.createDate|date}}</span>
              </div>
            </div>
          </div>
        </template>
      </vue-dtl>
    </div>
  </div>
</template>

<script>
import vueList from "../../share-template/list.vue";
import vueEdit from "../../share-template/edit.vue";
import vueAdd from "../../share-template/add.vue";
import vueDtl from "../../share-template/dtl.vue";
import { eventBus } from "../../../components/eventBus.js";

export default {
  data() {
    return {
      tab: {
        index: true,
        edit: false,
        add: false,
        dtl: false,
        set: v => {
          v = typeof v !== "string" ? "index" : v;

          for (name in this.tab) {
            if (typeof this.tab[name] === "boolean") {
              if (name == v) {
                this.tab[name] = true;
              } else {
                this.tab[name] = false;
              }
            }
          }
        }
      },
      httpUlr: {
        list: "admin/user/data",
        add: "admin/user/data",
        edit: "admin/user/data",
        del: "admin/user/data",
        dtl: "admin/user/data/dtl"
      },

      // 修改的对象
      editObj: {
        _id: "",
        name: "",
        roleId: ""
      },

      // 列表集合
      users: [],
      // 查看列表ids
      dtlIds: [],
      roles: []
    };
  },

  mounted() {
    // get roles
    this.$http.get("admin/userRole/data", {}).then(
      ok => {
        var body = ok.body;
        if (body.code) {
          this.roles = body.data;
        } else {
          this.$notify({
            type: "danger",
            title: "error",
            content: body.data
          });
        }
      },
      err => {
        this.$notify({
          type: "danger",
          title: "连接失败",
          content: "连接失败"
        });
      }
    );
  },
  methods: {
    // edit
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
    editBtn(item) {
      let fo = this.users.filter(item => {
        return item.bl === true;
      });
      if (fo.length <= 0) {
        this.$alert({
          title: "提示",
          content: "<strong class='text-danger'>没选择数据!</strong>",
          html: true
        }).catch(err => {});
        return;
      }

      let o = fo[0];
      this.editObj._id = o._id;
      this.editObj.name = o.name;
      this.editObj.roleId = (o.roleId && o.roleId._id) || "";
      this.tab.set("edit");
    },
    editCancel() {
      this.tab.set();
    },

    // del
    delBtn() {
      let fo = this.users.filter(item => {
        return item.bl === true;
      });
      if (fo.length <= 0) {
        this.$alert({
          title: "提示",
          content: "<strong class='text-danger'>没选择数据!</strong>",
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

            this.$loading("正在删除数据中...");
          this.$http
            .delete(`${this.httpUlr.del}/${listId.join(",")}`, { name: 123 })
            .then(
              ok => {
                this.$loading(false);
                var body = ok.body;
                if (body.code) {
                  this.users = this.users.filter(item => {
                    return listId.some(v => {
                      return v != item._id;
                    });
                  });
                  this.$info("success","删除数据成功！");
                } else {
               
                   this.$info("danger","删除数据失败！");
                }
              },
              err => {
                 this.$loading(false);
                 this.$info("danger","数据链接失败！");
              }
            );
        })
        .catch(err => {});
    },

    // add
    addBtn() {
      this.tab.set("add");
    },
    addCancel() {
      this.tab.set();
    },

    // dtl
    dtlBtn() {
      let fo = this.users.filter(item => {
        return item.bl === true;
      });
      if (fo.length <= 0) {
        this.$alert({
          title: "提示",
          content: "<strong class='text-danger'>没选择数据!</strong>",
          html: true
        }).catch(err => {});
        return;
      }
    
      this.dtlIds = fo.map(item => {
        return item._id;
      });
      eventBus.$emit("dtlList", this.dtlIds,this.tab);
       //this.tab.set("dtl");
    },
    dtlCancel() {
      this.tab.set();
    }
  },
  components: {
    vueList,
    vueEdit,
    vueAdd,
    vueDtl
  }
};
</script>
<style lang="scss">
.user {
  padding: 10px 10px;
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

.add {
  width: 600px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.edit {
  width: 500px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  .form-group {
    .btn + .btn {
      margin-left: 30px;
    }
  }
}
</style>



