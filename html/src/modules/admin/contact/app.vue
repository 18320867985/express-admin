<template>
  <div class="template-share rotation">
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
                  <vue-checkbox v-model="scope.allcheckBtn.ck" :callback="scope.allChcek"></vue-checkbox>
                </th>
                <th>编号</th>
                <th>公司名称</th>
                <th>标识</th>
                <th>排序</th>
                <th>X坐标</th>
                <th>Y坐标</th>
                <th>地址</th>

                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index)  of scope.list" :key="index">
                <td>
                  <vue-checkbox v-model="item.bl"></vue-checkbox>
                </td>
                <td>{{item._id}}</td>
                <td>{{ item.name}}</td>
                <td>{{ item.code}}</td>
                <td>{{ item.order}}</td>
                <td>{{ item.x}}</td>
                <td>{{ item.y}}</td>
                <td>{{ item.addr}}</td>
                <td>{{ item.createdt|date}}</td>
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
        <template slot="title">查看页面Banner大图</template>
        <template slot-scope="scope">
          <div class="list-group" v-for="(item,index) of scope.list" :key="index">
            <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>Id:</label>
                <span>{{item._id}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>名称:</label>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>标识:</label>
                <span>{{item.code}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>排序:</label>
                <span>{{item.order}}</span>
              </div>
            </div>
             <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>X坐标:</label>
                <span>{{item.x}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>Y坐标:</label>
                <span>{{item.y}}</span>
              </div>
            </div>
             <div class="list-group-item clearfix">
              <div class="col-xs-6 list-group-item-text">
                <label for>地址:</label>
                <span>{{item.addr}}</span>
              </div>
              <div class="col-xs-6 list-group-item-text">
                <label for>联系电话:</label>
                <span>{{item.tel}}</span>
              </div>
            </div>
          </div>
        </template>
      </vue-dtl>
    </div>

    <!--添加模块-->
    <div class="tab-slide" :class="{'active':tab.add}">
      <!--组件 -->
      <vue-add :cancel="addCancel" :url="httpUlr.add">
        <template slot="title">添加联系我们</template>

        <template>
          <form @submit.prevent="add('add')" data-vv-scope="add">
            <!-- content start-->

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.name')}">
              <label class="control-label" for="add.name">公司名称:</label>
              <input
                class="form-control"
                type="text"
                name="add.name"
                id="add.name"
                v-validate="{required:true,min:2}"
                v-model="addObj.name"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('add.name:required')">公司名称不为空！</p>
              <p class="text-danger" v-show="errors.has('add.name:min')">公司名称最小长度为2位！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.code')}">
              <label class="control-label" for="add.code">标识:</label>
              <input
                class="form-control"
                type="text"
                name="add.code"
                id="add.code"
                v-validate="{required:true,unique:'admin/contact/data-unique'}"
                v-model="addObj.code"
                placeholder="输入唯一标识"
              >
              <p class="text-danger" v-show="errors.has('add.code:required')">标识不为空！</p>
              <p class="text-danger" v-show="errors.has('add.code:unique')">标识已存在！</p>
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

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.x')}">
              <label class="control-label" for="add.x">X坐标:</label>
              <input
                class="form-control"
                type="text"
                name="add.x"
                id="add.x"
                v-validate="{required:true,decimal:true}"
                v-model="addObj.x"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('add.x:required')">X坐标不为空！</p>
              <p class="text-danger" v-show="errors.has('add.x:decimal')">不是有效的数值！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.y')}">
              <label class="control-label" for="add.y">Y坐标:</label>
              <input
                class="form-control"
                type="text"
                name="add.y"
                id="add.y"
                v-validate="{required:true,decimal:true}"
                v-model="addObj.y"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('add.y:required')">Y坐标不为空！</p>
              <p class="text-danger" v-show="errors.has('add.y:decimal')">不是有效的数值！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.tel')}">
              <label class="control-label" for="add.tel">联系电话:</label>
              <input
                class="form-control"
                type="text"
                name="add.tel"
                id="add.tel"
                v-validate="{required:true,regex:/^\d[0-9-]{4,}$/}"
                v-model="addObj.tel"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('add.tel:required')">联系电话不能为空！</p>
              <p class="text-danger" v-show="errors.has('add.tel:regex')">联系电话格式不对！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.addr')}">
              <label class="control-label" for="add.addr">地址:</label>
              <input
                class="form-control"
                type="text"
                name="add.addr"
                id="add.addr"
                v-validate="{required:true}"
                v-model="addObj.addr"
                placeholder="输入地址"
              >
              <p class="text-danger" v-show="errors.has('add.tel:required')">地址不能为空！</p>
            </div>

            <!-- content end-->
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="addError">添加</button>
            </div>
          </form>
        </template>
      </vue-add>
    </div>

    <!--编辑模块-->
    <div class="tab-slide" :class="{'active':tab.edit}">
      <!--组件-->
      <vue-edit :cancel="editCancel" :url="httpUlr.edit">
        <template slot="title">修改联系我们</template>
        <template>
          <form @submit.prevent="edit('edit')" data-vv-scope="edit">
            <!-- content start-->
            <div class=" form-group">
                <h5>标识：{{editObj.code}}</h5>
            </div>
             
            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.name')}">
              <label class="control-label" for="edit.name">公司名称:</label>
              <input
                class="form-control"
                type="text"
                name="edit.name"
                id="edit.name"
                v-validate="{required:true,min:2}"
                v-model="editObj.name"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('edit.name:required')">公司名称不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.name:min')">公司名称最小长度为2位！</p>
            </div>

    
            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.order')}">
              <label class="control-label" for="edit.order">排序:</label>
              <input
                class="form-control"
                type="text"
                name="edit.order"
                id="edit.order"
                v-validate="{required:true,min_value:1}"
                v-model="editObj.order"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('edit.order:required')">排序不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.order:min_value')">排序值不能小于1！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.x')}">
              <label class="control-label" for="edit.x">X坐标:</label>
              <input
                class="form-control"
                type="text"
                name="edit.x"
                id="edit.x"
                v-validate="{required:true,decimal:true}"
                v-model="editObj.x"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('edit.x:required')">X坐标不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.x:decimal')">不是有效的数值！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.y')}">
              <label class="control-label" for="edit.y">Y坐标:</label>
              <input
                class="form-control"
                type="text"
                name="edit.y"
                id="edit.y"
                v-validate="{required:true,decimal:true}"
                v-model="editObj.y"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('edit.y:required')">Y坐标不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.y:decimal')">不是有效的数值！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.tel')}">
              <label class="control-label" for="edit.tel">联系电话:</label>
              <input
                class="form-control"
                type="text"
                name="edit.tel"
                id="edit.tel"
                v-validate="{required:true,regex:/^\d[0-9-]{4,}$/}"
                v-model="editObj.tel"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('edit.tel:required')">联系电话不能为空！</p>
              <p class="text-danger" v-show="errors.has('edit.tel:regex')">联系电话格式不对！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.addr')}">
              <label class="control-label" for="edit.addr">地址:</label>
              <input
                class="form-control"
                type="text"
                name="edit.addr"
                id="edit.addr"
                v-validate="{required:true}"
                v-model="editObj.addr"
                placeholder="输入地址"
              >
              <p class="text-danger" v-show="errors.has('edit.tel:required')">地址不能为空！</p>
            </div>

            <!-- content end-->
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="editError">保存</button>
            </div>
          </form>
        </template>
      </vue-edit>
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
        list: "admin/contact/data",
        add: "admin/contact/data",
        edit: "admin/contact/data",
        del: "admin/contact/data",
        dtl: "admin/contact/data-dtl"
      },
      // inde列表集合
      list: [],
      //  edit修改的对象
      editObj: {
        _id: "",
         name: "",
        code: "",
        order: "",
        addr: "",
        tel: "",
        x: "",
        y: ""
      },

      // add 添加的对象
      addObj: {
        name: "",
        code: "",
        order: "",
        addr: "",
        tel: "",
        x: "",
        y: ""
      },

      // 自定义
      seriesTypes: []
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
    // edit btn
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
      this.editObj.code = o.code;
      this.editObj.order = o.order;
      this.editObj.x = o.x;
      this.editObj.y = o.y;
      this.editObj.tel = o.tel;
      this.editObj.addr = o.addr;
       
    },
    // 图片上传成功
    addFileOk(data, el) {
      var body = data;
      this.addObj.imgs.unshift({ url: "", src: body.data });
    },
    // 删除图片
    addFileDel(index) {
      this.addObj.imgs.splice(index, 1);
    },
    // 图片上传成功
    editFileOk(data, el) {
      var body = data;
      this.editObj.imgs.unshift({ url: "", src: body.data });
    },
    // 删除图片
    editFileDel(index) {
      this.editObj.imgs.splice(index, 1);
    }
  },
  computed: {
    addFileUpload() {
      // return this.addObj.imgs.map(e => e.src);
    },
    editdFileUpload() {
      //return this.editObj.imgs.map(e => e.src);
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
.upload-img {
  margin: 10px 0;
  width: 100%;
  position: relative;
  border: 1px solid #ddd;
  padding: 0 5px 5px 5px;
  border-radius: 5px;
  .close {
    color: red;
    font-size: 24px;
  }
  img {
    width: 100%;
    height: 180px;
  }

  .form-control {
    margin-top: 10px;
  }
}

.rotation {
  .list-group {
    .img-thumbnail {
      img {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>



