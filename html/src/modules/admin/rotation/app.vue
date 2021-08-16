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
                <th>名称</th>
                <th>标识</th>
                <th>图片</th>
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
                  <td>{{ item.imgs.length>0?`${item.imgs.length}张图片`:`没有图片`}}</td>
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
        <template slot="title">查看详细轮播图信息</template>
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
               <div class="col-xs-3" style="margin-bottom:10px;" v-for="(item2 ,index2) in item.imgs" :key="index2">
                 <div class="img-thumbnail">
                       <img class=" img-rounded" :src="item2.src" alt="">
                       <div class="caption">
                           <h5>url:{{item2.url}}</h5>
                       </div>
                      
                 </div>
              
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
        <template slot="title">添加轮播图</template>

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
                v-validate="{required:true,min:4}"
                v-model="addObj.name"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('add.name:required')">用户名不为空！</p>
              <p class="text-danger" v-show="errors.has('add.name:min')">用户名最小长度为4位！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.code')}">
              <label class="control-label" for="add.code">标识:</label>
              <input
                class="form-control"
                type="text"
                name="add.code"
                id="add.code"
                v-validate="{required:true,unique:'admin/rotation/data-unique'}"
                v-model="addObj.code"
                placeholder="输入唯一标识"
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

            <div class="form-group clearfix">
              <div class="col-xs-12 padding-lr-no">
                <label class="control-label" for="add.code">上传图片:</label>
              </div>

              <div class="col-sm-6 padding-lr-no">
                <input
                  class="form-control"
                  type="text"
                  disabled
                  name
                  id
                  v-model="addFileUpload"
                  placeholder="上传图片"
                >
              </div>
              <div class="col-sm-4">
                <!-- size=300 默认单位为M ; timeout=30 默认单位为秒-->
                <vue-file
                name="vue-file-add"
                  btn-class="btn-primary"
                  url="/file"
                  :ok="addFileOk"
                  file-type="image/*"
                  :size="300"
                  :timeout="30"
                  line-class="text-primary"
                  btn-text="上传图片"
                ></vue-file>
              </div>
            </div>

            <div class="form-group clearfix">
              <div class="col-xs-6 clearfix">
                <div class="upload-img clearfix" v-for="(item,index) in addObj.imgs" :key="index">
                  <span class="close" @click="addFileDel(index)">&times;</span>
                  <img :src="item.src" alt>
                  
                  <input
                    class="form-control"
                    placeholder="输入url链接"
                    type="text"
                    name
                    id
                    v-model="item.url"
                  >
                </div>
              </div>
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
        <template slot="title">修改轮播图信息</template>
        <template>
          <form @submit.prevent="edit('edit')" data-vv-scope="edit">
            <!-- content start-->
            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.name')}">
              <label class="control-label" for="edit.name">名称:</label>
              <input
                class="form-control"
                type="text"
                name="edit.name"
                id="edit.name"
                v-validate="{required:true,min:4}"
                v-model="editObj.name"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('edit.name:required')">用户名不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.name:min')">用户名最小长度为4位！</p>
            </div>

            <!-- <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.code')}">
              <label class="control-label" for="edit.code">code:</label>
              <input
                class="form-control"
                type="text"
                name="edit.code"
                id="edit.code"
                v-validate="{required:true,unique:'admin/rotation/data-unique'}"
                v-model="editObj.code"
                placeholder="输入唯一标识"
              >
              <p class="text-danger" v-show="errors.has('edit.code:required')">code不为空！</p>
              <p class="text-danger" v-show="errors.has('edit.code:unique')">code值已存在！</p>
            </div>-->
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

            <div class="form-group clearfix">
              <div class="col-xs-12 padding-lr-no">
                <label class="control-label" for="edit.code">上传图片:</label>
              </div>

              <div class="col-sm-6 padding-lr-no">
                <input
                  class="form-control"
                  type="text"
                  disabled
                  name
                  id
                  v-model="editdFileUpload"
                  placeholder="上传图片"
                >
              </div>
              <div class="col-sm-4">
                <!-- size=300 默认单位为M ; timeout=30 默认单位为秒-->
                <vue-file
                  name="vue-file-edit"
                  btn-class="btn-primary"
                  url="/file"
                  :ok="editFileOk"
                  file-type="image/*"
                  :size="300"
                  :timeout="30"
                  line-class="text-primary"
                  btn-text="上传图片"
                ></vue-file>
              </div>
            </div>

            <div class="form-group clearfix">
              <div class="col-xs-6 clearfix">
                <div class="upload-img clearfix" v-for="(item,index) in editObj.imgs" :key="index">
                  <span class="close" @click="editFileDel(index)">&times;</span>
                  <img :src="item.src" alt>
                  <input
                    class="form-control"
                    placeholder="输入url链接"
                    type="text"
                    name
                    id
                    v-model="item.url"
                  >
                </div>
              </div>
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

export default {
  mixins: [mixin],
  data() {
    return {
      httpUlr: {
        list: "admin/rotation/data",
        add: "admin/rotation/data",
        edit: "admin/rotation/data",
        del: "admin/rotation/data",
        dtl: "admin/rotation/data-dtl"
      },
      // inde列表集合
      list: [],
      //  edit修改的对象
      editObj: {
        _id: "",
        name: "",
        code: "",
        order: "",
        imgs: []
      },

      // add 添加的对象
      addObj: {
        name: "",
        code: "",
        order: "",
        imgs: []
      }

      // 自定义
    };
  },

  mounted() {},
  methods: {
      // add btn
      addBtn() {
      this.tab.set("add");
      this.errors.clear('add');
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
      this.editObj.imgs =Array.prototype.slice.call(o.imgs);
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
      return this.addObj.imgs.map(e => e.src);
    },
    editdFileUpload() {
      return this.editObj.imgs.map(e => e.src);
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

.rotation{
  .list-group{
    .img-thumbnail{
      img{
        width: 100%;
        height:  200px;
      }
    }
  }
}
</style>



