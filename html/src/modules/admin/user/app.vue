<template>
  <div class="user">
    <div class="container-fluid-12">
      <div class="btn-toolbar clearfix">
        <div class="btn-group pull-left"></div>
        <div class="btn-group pull-right">
          <button class="btn btn-default btn-sm" @click="addBtn(item)">
            <span class="text-primary glyphicon glyphicon-plus"></span> 添加
          </button>
          <button class="btn btn-default btn-sm" @click.prevent="delAll()">
            <span class="glyphicon glyphicon-trash text-danger"></span> 删除
          </button>
        </div>
      </div>

      <table class="table table-hover table-bordered">
        <thead>
          <tr class="text-center">
            <th>
              <vue-checkbtn :callback="allChcek" v-model="allcheckBtn">
                <span class="glyphicon glyphicon-check"></span> 全选
              </vue-checkbtn>
            </th>
            <th>编号</th>
            <th>用户名</th>
            <th>类型</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index)  of users" :key="index">
            <td>
              <vue-checkbox v-model="item.bl"></vue-checkbox>
            </td>
            <td>{{ item._id}}</td>
            <td>{{ item.name}}</td>
            <td>{{ item.roleId&&item.roleId.name}}</td>
            <td>{{ item.createDate|date}}</td>
            <td>
              <button class="btn btn-warning btn-xs" @click="editBtn(item)">修改</button>
              <!-- <button class="btn btn-danger btn-xs" @click.prevent="del(item._id,index)">删除</button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--修改-->
    <modal v-model="editOpen" title="修改用户信息" ref="modal" id="modal-demo">
      <h4 class="text-muted">用户名: {{editObj.name}}</h4>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">用户类型</label>
          <select name id class="form-control" v-model="editObj.roleId" placeholder="Email">
            <option
              v-for="(item ,index) of roles"
              :key="index"
              :selected="editObj.roleId===item_id"
              :value="item._id"
            >{{item.name}}</option>
          </select>
        </div>
      </form>
      <div slot="footer">
        <button type="button" @click.prevent="editOpen=false" class="btn btn-defaul">取消</button>
        <button type="submit" @click.prevent="edit" class="btn btn-primary">修改</button>
      </div>
    </modal>

    <!--添加-->
    <modal v-model="addOpen" title="添加用户信息" ref="modal" id="modal-demo">
      <div>
        <form>
          <div class="form-group has-feedback" :class="{' has-error':errors.has('user')}">
            <label class="control-label" for="user">用户名:</label>
            <input
              class="form-control"
              type="text"
              name="user"
              id="user"
              v-validate="{required:true,min:4}"
              placeholder="输入用户名"
            >
            <p class="text-danger" v-show="errors.has('user:required')">用户名不为空！</p>
            <p class="text-danger" v-show="errors.has('user:min')">用户名最小长度为4位！</p>
            <span
              v-show="errors.has('user')"
              class="glyphicon glyphicon-remove form-control-feedback"
              aria-hidden="true"
            ></span>
          </div>
          <div class="form-group has-feedback" :class="{'has-error':errors.has('pwd')}">
            <label class="control-label" for="pwd">密码:</label>
            <input
              class="form-control"
              type="password"
              id="pwd"
              name="pwd"
              ref="pwd"
              placeholder="输入密码"
              v-validate="{ required:true,min:8}"
            >
            <p class="text-danger" v-show="errors.has('pwd:required')">密码不为空！</p>
            <p class="text-danger" v-show="errors.has('pwd:min')">密码最小长度为8位！</p>
            <span
              v-show="errors.has('pwd')"
              class="glyphicon glyphicon-remove form-control-feedback"
              aria-hidden="true"
            ></span>
          </div>

          <div class="form-group has-feedback" :class="{'has-error':errors.has('pwd2')}">
            <label class="control-label" for="pwd2">确认密码:</label>
            <input
              class="form-control"
              type="password"
              name="pwd2"
              id="pwd2"
              v-validate="{ required:true,confirmed:'pwd'}"
              data-vv-as="pwd"
              placeholder="输入确认密码"
            >
            <p class="text-danger" v-show="errors.has('pwd2:required')">密码不为空！</p>
            <p class="text-danger" v-show="errors.has('pwd2:confirmed')">两次密码不相同！</p>
            <span
              v-show="errors.has('pwd2')"
              class="glyphicon glyphicon-remove form-control-feedback"
              aria-hidden="true"
            ></span>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">用户类型</label>
            <select name id class="form-control" v-model="addObj.roleId">
              <option value>==选择类型==</option>
              <option v-for="(item ,index) of roles" :key="index" :value="item._id">{{item.name}}</option>
            </select>
          </div>
          <div class="form-group has-feedback" :class="{'has-error':errors.has('email')}">
            <label class="control-label" for="email">邮箱:</label>
            <input
              class="form-control"
              type="text"
              name="email"
              id="email"
              v-validate="'required|email'"
              placeholder="输入邮箱"
            >
            <p class="text-danger" v-show="errors.has('eamil:required')">邮箱不为空！</p>
            <p class="text-danger" v-show="errors.has('email:email')">邮箱格式不对！</p>
            <span
              v-show="errors.has('email')"
              class="glyphicon glyphicon-remove form-control-feedback"
              aria-hidden="true"
            ></span>
          </div>
          <div class="form-group">
            <alert type="danger" v-if="show" dismissible @dismissed="show = false">{{errText}}</alert>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button type="button" @click.prevent="addOpen=false" class="btn btn-defaul">取消</button>
        <button type="submit" @click.prevent="edit" class="btn btn-primary">添加</button>
      </div>
    </modal>

    <!--分页-->
    <vue-paging :page-click="pageClick" text-class="text-center"></vue-paging>
  </div>
</template>

<script>
import { eventBus } from "../../../components/eventBus.js";

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
      addObj: {
        name: "",
        pwd: "",
        pwd2: "",
        email: "",
        roleId: ""
      },

      roles: [],
      allcheckBtn: false,
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

  mounted() {
    // get users
    this.getUsers(1);
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
      this.editObj._id = item._id;
      this.editObj.name = item.name;
      this.editObj.roleId = (item.roleId && item.roleId._id) || "";
      this.editOpen = true;
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
          title:"提示",
          content: "<strong class='text-danger'>还没选择数据!</strong>",
          html:true
          
        }).catch(err=>{});
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
          this.$http.delete(`admin/user/data/${listId}`,{name:123}).then(
            ok => {
              var body = ok.body;
              if (body.code) {
                this.users= this.users.filter(item=>{return listId.some(v=>{ return v== item._id})})
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
      this.addOpen = true;
    },
    getUsers(i) {
      // 分页
      this.$loading();
      this.$http.get(`admin/user/data/${i}/${this.pageObj.pageItem}`, {}).then(
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

            eventBus.$emit("initPage", this.pageObj);
            this.allcheckBtn = false;
          } else {
            this.$notify({
              type: "danger",
              content: body.data
            });
          }
        },
        err => {
          this.$loading(false);
          this.$notify({
            type: "danger",
            content: "连接失败"
          });
        }
      );
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
  },
  components: {}
};
</script>
<style lang="scss">
.user {
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



