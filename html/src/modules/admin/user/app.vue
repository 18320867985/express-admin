<template>
  <div class="user">
    <!-- 主列表模块-->
    <div class="tab-slide" :class="{'active':tab.index}">
      <!--操作按钮组-->
      <div class="btn-toolbar clearfix">
        <div class="btn-group pull-left"></div>
        <div class="btn-group pull-right">
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
      <vue-list v-model="list" :url="httpUlr.list">
        <template slot-scope="scope">
          <table class="table table-hover table-bordered">
            <thead>
              <tr class="text-center">
                <th>
                  <!-- <vue-checkbtn :callback="scope.allChcek" v-model="scope.allcheckBtn">
                    <span class="glyphicon glyphicon-check"></span>
                  </vue-checkbtn>-->
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
      <vue-edit :cancel="editCancel" :url="httpUlr.edit">
        <template slot="title">修改用户信息</template>
        <template>
          <form @submit.prevent="edit('edit')" data-vv-scope="edit">
            <!-- content start-->
            <div class="form-group">
              <label for="exampleInputEmail1">用户名:{{editObj.name}}</label>
            </div>
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

            <!-- content end-->
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="editError">保存</button>
              
            </div>
          </form>
        </template>
      </vue-edit>
    </div>

    <!--添加模块-->
    <div class="tab-slide" :class="{'active':tab.add}">
      <!--组件 -->
      <vue-add :cancel="addCancel" :url="httpUlr.add">
        <template slot="title">添加用户信息</template>

        <template>
          <form @submit.prevent="add('add')" data-vv-scope="add">
            <!-- content start-->
            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.name')}">
              <label class="control-label" for="add.name">用户名:</label>
              <input
                class="form-control"
                type="text"
                name="add.name"
                id="add.name" 
                v-validate="{required:true,min:4,unique:'admin/user/data/unique'}"
                v-model="addObj.name"
                placeholder="输入用户名"
              >
              <p class="text-danger" v-show="errors.has('add.name:required')">用户名不为空！</p>
              <p class="text-danger" v-show="errors.has('add.name:min')">用户名最小长度为4位！</p>
                <p class="text-danger" v-show="errors.has('add.name:unique')">用户名已存在！</p>
              <span
                v-show="errors.has('add.name')"
                class="glyphicon glyphicon-remove form-control-feedback"
                aria-hidden="true"
              ></span>
            </div>

            <div class="form-group has-feedback" :class="{'has-error':errors.has('add.pwd')}">
              <label class="control-label" for="pwd">密码:</label>
              <input
                class="form-control"
                type="password"
                id="pwd"
                v-model="addObj.pwd"
                name="add.pwd"
                ref="add.pwd"
                placeholder="输入密码"
                v-validate="{ required:true,min:8}"
              >
              <p class="text-danger" v-show="errors.has('add.pwd:required')">密码不为空！</p>
              <p class="text-danger" v-show="errors.has('add.pwd:min')">密码最小长度为8位！</p>
              <span
                v-show="errors.has('add.pwd')"
                class="glyphicon glyphicon-remove form-control-feedback"
                aria-hidden="true"
              ></span>
            </div>

            <div class="form-group has-feedback" :class="{'has-error':errors.has('add.pwd2')}">
              <label class="control-label" for="pwd2">确认密码:</label>
              <input
                class="form-control"
                type="password"
                name="add.pwd2"
                id="pwd2"
                v-model="addObj.pwd2"
                v-validate="{ required:true,confirmed:'add.pwd'}"
                data-vv-as="pwd"
                placeholder="输入确认密码"
              >
              <p class="text-danger" v-show="errors.has('add.pwd2:required')">密码不为空！</p>
              <p class="text-danger" v-show="errors.has('add.pwd2:confirmed')">两次密码不相同！</p>
              <span
                v-show="errors.has('add.pwd2')"
                class="glyphicon glyphicon-remove form-control-feedback"
                aria-hidden="true"
              ></span>
            </div>

            <div class="form-group has-feedback" :class="{'has-error':errors.has('add.roleId')}">
              <label class="control-label" for="roleId">用户类型:</label>
              <select
                class="form-control"
                v-model="addObj.roleId"
                name="add.roleId"
                id="roleId"
                v-validate="'required'"
              >
                <option value>==选择类型==</option>
                <option :value="item._id" v-for="(item ,index) of roles" :key="index">{{item.name}}</option>
              </select>
              <p class="text-danger" v-show="errors.has('add.roleId:required')">用户类型不为空！</p>
              <span
                v-show="errors.has('add.roleId')"
                class="glyphicon glyphicon-remove form-control-feedback"
                aria-hidden="true"
              ></span>
            </div>

            <div class="form-group has-feedback" :class="{'has-error':errors.has('add.email')}">
              <label class="control-label" for="email">邮箱:</label>
              <input
                class="form-control"
                type="text"
                name="add.email"
                id="email"
                v-model="addObj.email"
                v-validate="'required|email'"
                placeholder="输入邮箱"
              >
              <p class="text-danger" v-show="errors.has('add.eamil:required')">邮箱不为空！</p>
              <p class="text-danger" v-show="errors.has('add.email:email')">邮箱格式不对！</p>
              <span
                v-show="errors.has('add.email')"
                class="glyphicon glyphicon-remove form-control-feedback"
                aria-hidden="true"
              ></span>
            </div>
                  {{errors}}
            <!-- content end-->
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="addError" >添加</button>
            </div>
          </form>
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

import VueList from "../../template-share/list.vue";
import VueEdit from "../../template-share/edit.vue";
import VueAdd from "../../template-share/add.vue";
import VueDtl from "../../template-share/dtl.vue";
import { mixin } from "../../template-share/mixin";
import { eventBus } from "../../../components/eventBus.js";

export default {
  mixins: [mixin],
  data() {
    return {
      httpUlr: {
        list: "admin/user/data",
        add: "admin/user/data",
        edit: "admin/user/data",
        del: "admin/user/data",
        dtl: "admin/user/data/dtl"
      },
      // inde列表集合
      list: [],
      //  edit修改的对象
      editObj: {
        _id: "",
        name: "",
        roleId: ""
      },

      // add 添加的对象
      addObj: {
        name: "",
        pwd: "",
        pwd2: "",
        email: "",
        roleId: ""
      },

      // 自定义
      roles: []
    };
  },

  mounted() {
    // get roles
    this.$http.get("admin/userRole/data", {}).then(
      ok => {
        var body = ok.body;
        if (body.code) {
          this.roles = body.data || [];
        }
      },
      err => {
        this.$info("danger", "数据链接失败！");
      }
    );
  },
  methods: {
    // edit
    editBtn(item) {
      let fo = this.list.filter(item => {
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
      this.tab.set("edit");
      this.errors.clear('edit');
      let o = fo[0];

      // 修改内容
      this.editObj._id = o._id;
      this.editObj.name = o.name;
      this.editObj.roleId = (o.roleId && o.roleId._id) || "";
    }
  },

  components: {
    VueList,
    VueEdit,
    VueAdd,
    VueDtl
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

.template-add {
  width: 600px;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.template-edit {
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



