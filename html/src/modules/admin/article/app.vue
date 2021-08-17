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
                <th>描述</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index)  of scope.list" :key="index">
                <td>
                  <vue-checkbox v-model="item.bl"></vue-checkbox>
                </td>
                <td>{{item._id}}</td>
                <td>{{ item.title}}</td>
                <td>{{ item.code}}</td>
                  <td>{{ item.desc}}</td>
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
        <template slot="title">查看文章详情</template>
        <template slot-scope="scope">
          <div class="list-group" v-for="(item,index) of scope.list" :key="index">
            <div class="list-group-item clearfix">
              <div class="col-xs-4 list-group-item-text">
                <label for>Id:</label>
                <span>{{item._id}}</span>
              </div>
              <div class="col-xs-4 list-group-item-text">
                <label for>标识:</label>
                <span>{{item.code}}</span>
              </div>
               <div class="col-xs-4 list-group-item-text">
                <label for>排序:</label>
                <span>{{item.order}}</span>
              </div>
            </div>
            
            <div class="list-group-item clearfix">
              <div class="col-xs-12 list-group-item-text">
                <label for>名称:</label>
                <span>{{item.title}}</span>
              </div>
              <div class="col-xs-12 list-group-item-text">
               <label for>描述:</label>
                <span>{{item.desc}}</span>
              </div>
              <div class="col-xs-12 list-group-item-text">
                <label for>文章内容:</label>
                <div v-html="item.content"> </div>
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
        <template slot="title">添加文章</template>

        <template>
          <form @submit.prevent="add('add')" data-vv-scope="add">
            <!-- content start-->
            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.title')}">
              <label class="control-label" for="add.name">标题:</label>
              <input
                class="form-control"
                type="text"
                name="add.title"
                id="add.title"
                v-validate="{required:true,min:4}"
                v-model="addObj.title"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('add.title:required')">标题不能为空！</p>
              <p class="text-danger" v-show="errors.has('add.title:min')">标题最小长度为4位！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.code')}">
              <label class="control-label" for="add.code">标识:</label>
              <input
                class="form-control"
                type="text"
                name="add.code"
                id="add.code"
                v-validate="{required:true,unique:'admin/article/data-unique'}"
                v-model="addObj.code"
                placeholder="输入标识"
              >
              <p class="text-danger" v-show="errors.has('add.code:required')">标识不能为空！</p>
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
              <p class="text-danger" v-show="errors.has('add.order:required')">排序不能为空！</p>
              <p class="text-danger" v-show="errors.has('add.order:min_value')">排序值不能小于1！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('add.desc')}">
              <label class="control-label" for="add.desc">描述:</label>
              <input
                class="form-control"
                type="text"
                name="add.desc"
                id="add.desc"
                v-validate="{required:true,min:4}"
                v-model="addObj.desc"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('add.desc:required')">描述不能为空！</p>
              <p class="text-danger" v-show="errors.has('add.desc:min')">描述最小长度为4位！</p>
            </div>

            <div class="form-group has-feedback"  :class="{' has-error':errors.has('add.content')}">
               <label class="control-label" for="add.content">文章内容:</label>
               <input
                class="form-control v-hide"
                type="text"
                name="add.content"
                id="add.content"
                v-validate="{required:true}"
                v-model="addObj.content"
                placeholder="输入数值"
              >
        
		          <script id="add-editor" type="text/plain" style="width:100%;height:200px;"></script>

               <p class="text-danger" v-show="errors.has('add.content:required')">文章内容不能为空！</p>
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
        <template slot="title">修改文章</template>
        <template>
          <form @submit.prevent="edit('edit')" data-vv-scope="edit">
            <!-- content start-->
            <div class="form-group">
              <h5>标识：{{editObj.code}}</h5>
            </div>
            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.title')}">
              <label class="control-label" for="edit.title">标题:</label>
              <input
                class="form-control"
                type="text"
                name="edit.title"
                id="edit.title"
                v-validate="{required:true,min:2}"
                v-model="editObj.title"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('edit.title:required')">标题不能为空！</p>
              <p class="text-danger" v-show="errors.has('edit.title:min')">标题最小长度为2位！</p>
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
            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.desc')}">
              <label class="control-label" for="edit.desc">描述:</label>
              <input
                class="form-control"
                type="text"
                name="edit.desc"
                id="edit.desc"
                v-validate="{required:true,min:4}"
                v-model="editObj.desc"
                placeholder="输入名称"
              >
              <p class="text-danger" v-show="errors.has('edit.desc:required')">描述不能为空！</p>
              <p class="text-danger" v-show="errors.has('edit.desc:min')">描述最小长度为4位！</p>
            </div>

            <div class="form-group has-feedback" :class="{' has-error':errors.has('edit.content')}">
               <label class="control-label" for="edit.content">文章内容:</label>
		          <script id="edit-editor" type="text/plain" style="width:100%;height:200px;"></script>
           
               <input
                class="form-control v-hide"
                type="text"
                name="edit.content"
                id="edit.content"
                v-validate="{required:true}"
                v-model="editObj.content"
                placeholder="输入数值"
              >
              <p class="text-danger" v-show="errors.has('edit.content:required')">文章内容不能为空！</p>
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
        list: "admin/article/data",
        add: "admin/article/data",
        edit: "admin/article/data",
        del: "admin/article/data",
        dtl: "admin/article/data-dtl"
      },
      // inde列表集合
      list: [],
      //  edit修改的对象
      editObj: {
        _id: "",
        name: "",
        code: "",
        order: "",
        desc:"",
        content:""
      },

      // add 添加的对象
      addObj: {
        title: "",
        code: "",
        order: "",
        desc:"",
        content:""
      }

      // 自定义
    };
  },

  mounted() {
    let add=UE.getEditor('add-editor');
    let edit=UE.getEditor('edit-editor');
  var self= this;
   add.addListener( 'selectionchange', function( editor ) {
     self.addObj.content=this.getContent()
  });

   edit.addListener( 'selectionchange', function( editor ) {
     self.editObj.content=this.getContent()
  });

  },
  methods: {
      // add btn
      addBtn() {
      this.tab.set("add");
      this.errors.clear('add');
      UE.getEditor('add-editor').setContent("");
      // 修改内容
    // this.addObj.imgs=[];
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
      this.editObj.title = o.title;
      this.editObj.code = o.code;
      this.editObj.order = o.order;
      this.editObj.desc = o.desc;
      this.editObj.content = o.content;
      UE.getEditor('edit-editor').setContent( this.editObj.content);
   
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



