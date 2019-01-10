<template>
  <div class="user">
    <div class="container-fluid-12">
      <table class="table table-hover table-bordered">
        <thead>
          <tr class="text-center">
            <th>编号</th>
            <th>用户名</th>
            <th>类型</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index)  of users" :key="item._id">
            <td>{{ item._id}}</td>
            <td>{{ item.name}}</td>
            <td>{{ item.roleId&&item.roleId.name}}</td>
            <td>{{ item.createDate|date}}</td>
            <td>
              <button class="btn btn-warning btn-xs" @click="editBtn(item)">修改</button>
              <button class="btn btn-danger btn-xs" @click.prevent="del(item._id,index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal v-model="open" title="修改用户信息" ref="modal" id="modal-demo">
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
        <button type="button" @click.prevent="open=false" class="btn btn-defaul">取消</button>
        <button type="submit" @click.prevent="edit" class="btn btn-primary">修改</button>
      </div>
    </modal>
    <paging :page-click="pageClick" :page-obj="pageObj"></paging>
  </div>
</template>

<script>
import paging from "../../../components/common/paging.vue";
export default {
  data() {
    return {
      users: [],
      open: false,
      editObj: {
        _id: "",
        name: "",
        roleId: ""
      },
      roles: [],
      // 分页
      pageObj: {
        index: 1, //	当前页
        pageItem: 20, //  每页条数
        allItem: 100, //  总条数
        showCount: 5, //  显示的页码数目
        selector: ".paging", //分页父元素
        isShowSkip: true, // 是否显示跳转页
        isShowCount: true, // 是否显示总页数
        isShowAllItems: true // 是否显示总条目
      }
    };
  },
  mounted() {
    // get users
    this.getUsers();

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

    //  // 分页
    //     paging.init({
    //         index: 1, //	当前页
    //         pageItem: 10, //  每页条数
    //         allItem: 100, //  总条数
    //         showCount: 5, //  显示的页码数目
    //         selector: ".paging", //分页父元素
    //         isAnimation: true, //是否显示动画
    //         isShowSkip: true, // 是否显示跳转页
    //         isShowCount: true, // 是否显示总页数
    //         isShowAllItems: true, // 是否显示总条目
    //     });

    //     //点击事件
    //     $(document).on("paging_click", function (event, id) {

    //         //id 当前点击的元素的页码
    //         alert("第" + id + "页");
    //         // $.get("/json/paging.json", {
    //         //     id: id
    //         // }, function (data) {

    //         //     var data = data.map(function (item) {
    //         //         item.a2 = "第" + id + "页：" + item.a2;
    //         //         item.a3 = "第" + id + "页：" + item.a3;
    //         //         item.a4 = "第" + id + "页：" + item.a4;
    //         //         return item;

    //         //     });

    //         //     vm.list = data;
    //         //     $.loadingRemove(".app");

    //         // });

    //     });
  },
  methods: {
    // del
    del(id, index) {
      this.$confirm({
        title: "删除数据",
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
                title: "连接失败",
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
      ({
        _id: this.editObj._id,
        name: this.editObj.name,
        roleId,
        roleId: { _id: this.editObj.roleId }
      } = item);
      this.open = true;
    },
    edit() {
      this.$http.put(`admin/user/data`, this.editObj).then(
        ok => {
          var body = ok.body;
          this.open = false;
          if (body.code) {
            this.getUsers();
            this.$notify({
              type: "success",
              content: "修改数据成功！"
            });
          } else {
            this.$notify({
              type: "danger",
              content: "修改数据失败！"
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
    getUsers() {
      this.$http.get("admin/user/data", {}).then(
        ok => {
          var body = ok.body;
          if (body.code) {
            this.users = body.data;
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
    callback(msg) {
      this.$notify(`Modal dismissed with msg '${msg}'.`);
    },
    pageClick(id) {
      alert(id);
    }
  },
  components: {
    paging
  }
};
</script>
<style lang="scss">
.user {
  padding-top: 20px;
  .table {
    th,
    td {
      text-align: center;
    }
  }
}
</style>



