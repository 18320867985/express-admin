<template>
  <div class="template-share userrole">
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
                <th>系列类型名称</th>
                <th>标识</th>
                <th>创建时间</th>
                <th>排序</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of scope.list" :key="item._id">
                <td>
                  <vue-checkbox v-model="item.bl"></vue-checkbox>
                </td>
                <td>{{ item._id}}</td>
                <td>{{ item.name}}</td>
                <td>{{ item.code}}</td>
                <td>{{ item.createdt|date}}</td>
                <td>{{ item.order}}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-list>
    </div>

    <!--详细列表模块-->
    <div class="tab-slide" :class="{'active':tab.dtl}">
      <!--组件-->
      <vue-dtl :cancel="dtlCancel" :url="httpUlr.dtl">
        <template slot="title">查看详细系列类型</template>
        <template slot-scope="scope">
          <div class="list-group" v-for="(item,index) of scope.list" :key="index">
            <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>系列类型Id:</label>
                <span>{{item._id}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>系列类型名称:</label>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>标识:</label>
                <span>{{item.code}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>创建时间:</label>
                <span>{{item.createdt|date}}</span>
              </div>
            </div>
          </div>
        </template>
      </vue-dtl>
    </div>

    <!--编辑模块-->
    <div class="tab-slide" :class="{'active':tab.edit}">
      <!--组件-->
      <vue-edit :cancel="editCancel" :url="httpUlr.edit">
        <template slot="title">修改系列类型</template>
        <template>
          <form @submit.prevent="edit('edit')" data-vv-scope="edit">
            <!-- content start-->
            <div class="form-group">
              <label>编号：{{editObj._id}}</label>
            </div>
            <div class="form-group" :class="{' has-error':errors.has('edit.name')}">
              <label class="control-label" for="name">类型名称</label>
              <input
                class="form-control"
                type="text"
                name="name"
                v-model="editObj.name"
                v-validate="{required:true}"
                id="name"
              >
              <p class="text-danger" v-show="errors.has('edit.name:required')">类型名称不为空！</p>
            </div>

            <div class="form-group" :class="{' has-error':errors.has('edit.order')}">
              <label class="control-label" for="name">排序</label>
              <input
                class="form-control"
                type="text"
                name="order"
                v-model="editObj.order"
                v-validate="{required:true,min_value:1}"
                id="name"
              >
              <p class="text-danger" v-show="errors.has('edit.order:required')">排序不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.order:min_value')">最小值不能为小于1！</p>
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
        <template slot="title">添加系列类型</template>

        <template>
          <form @submit.prevent="add('add')" data-vv-scope="add">
            <!-- content start-->
            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.name')}">
              <label class="control-label" for="add.name">名称:</label>
              <input
                class="form-control"
                type="text"
                name="add.name"
                id="add.name"
                v-validate="{required:true,min:2}"
                v-model="addObj.name"
                placeholder="输入系列类型名称"
              >
              <p class="text-danger" v-show="errors.has('add.name:required')">系列类型名称不为空！</p>
              <p class="text-danger" v-show="errors.has('add.name:min')">系列类型名称最小长度为2位！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.code')}">
              <label class="control-label" for="add.code">标识:</label>
              <input
                class="form-control"
                type="text"
                name="add.code"
                id="add.code"
                v-validate="{required:true,unique:'admin/seriestype/data-unique'}"
                v-model="addObj.code"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('add.code:required')">标识不为空！</p>
      
              <p class="text-danger" v-show="errors.has('add.code:unique')">标识值已存在！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.order')}">
              <label class="control-label" for="add.order">排序:</label>
              <input
                class="form-control"
                type="text"
                name="add.order"
                id="add.order"
                v-validate="{required:true,min_value:1}"
                v-model="addObj.order"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('add.order:required')">排序不为空！</p>
              <p class="text-danger" v-show="errors.has('add.order:min_value')">排序值不能小于1！</p>
            </div>

            <!-- content end-->
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="addError">添加</button>
            </div>
          </form>
        </template>
      </vue-add>
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
        list: "admin/seriestype/data",
        add: "admin/seriestype/data",
        edit: "admin/seriestype/data",
        del: "admin/seriestype/data",
        dtl: "admin/seriestype/data-dtl"
      },
      // inde列表集合
      list: [],
      //  edit修改的对象
      editObj: {
        _id: "",
        name: "",
        order: 1
      },

      // add 添加的对象
      addObj: {
        name: "",
        code: "",
        order: ""
      }

      // 自定义
    };
  },

  mounted() {},
  methods: {
    // add btn
    addBtn() {
      this.tab.set("add");
      this.errors.clear("add");
      // 修改内容
    },
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
      this.errors.clear("edit");
      let o = fo[0];

      // 修改内容
      this.editObj._id = o._id;
      this.editObj.name = o.name;
      this.editObj.order = o.order;
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
.template-add {
}
.template-edit {
}
</style>



