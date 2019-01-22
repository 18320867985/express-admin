import { eventBus } from "../../components/eventBus.js";
export const mixin = {

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
      tempEdit: {}, // 恢复默认对象
      tempAdd: {},  // 恢复默认对象

      //  dtl查看列表ids
      dtlIds: [],
    }
  },
  methods: {

    // del
    delBtn() {
      let fo = this.list.filter(item => {
        return item.bl === true;
      });
      if (fo.length <= 0) {
        this.$alert({
          title: "提示",
          content: "<strong class='text-danger'>没选择数据!</strong>",
          html: true
        }).catch(err => { });
        return;
      }
      this.$confirm({
        content: "确认删除数据？"
      })
        .then(ok => {
          let listId = this.list
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

                  eventBus.$emit("pageList"); // 更新分页
                  this.$info("success", "删除数据成功！");
                } else {

                  this.$info("danger", "删除数据失败！");
                }
              },
              err => {
                this.$loading(false);
                this.$info("danger", "数据链接失败！");
              }
            );
        })
        .catch(err => { });
    },

    // edit
    editCancel() {
      this.tab.set();
    },
    edit(scope) {

      this.$validator.validateAll(scope).then(result => {
        this.$loading("正在保存中...");
        this.$http
          .put(`${this.httpUlr.edit}`, this.editObj)
          .then(ok => {
            this.$loading(false);
            this.tab.set(); //  back index

            this.resetEditObj();  // 恢复默认值
            var body = ok.body;
            if (body.code) {
              this.$info("success", "修改数据成功！");
              eventBus.$emit("pageList"); // 更新分页
            } else {
              this.$info("danger", "修改数据失败！");
            }
          })
          .catch(err => {
            this.$loading(false);
            this.$info("danger", "数据链接失败！");
          });
      });
    },

    // add
    add(scope) {

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.$loading("正在添加中...");
          this.$http.post(`${this.httpUlr.add}`, this.addObj).then(ok => {
            this.$loading(false);
            this.tab.set(); //  back index

            this.resetAddObj();  // 恢复默认值
            var body = ok.body;
            if (body.code) {
              this.$info("success", "添加数据成功！");
              eventBus.$emit("pageList"); // 更新分页
            } else {
              this.$info("danger", "添加数据失败！");
            }

          }).catch(err => {
            this.$loading(false);
            this.$info("danger", "数据链接失败！");
          });
        }
      });

    },
  // add
    addCancel() {
      this.tab.set();
    },

    // dtl
    dtlBtn() {
      let fo = this.list.filter(item => {
        return item.bl === true;
      });
      if (fo.length <= 0) {
        this.$alert({
          title: "提示",
          content: "<strong class='text-danger'>没选择数据!</strong>",
          html: true
        }).catch(err => { });
        return;
      }

      this.dtlIds = fo.map(item => {
        return item._id;
      });
      eventBus.$emit("dtlList", this.dtlIds, this.tab);
      //this.tab.set("dtl");
    },
    dtlCancel() {
      this.tab.set();
    },
    reseAddObj() {
      for (name in this.tempAdd) {
        this.addObj[name] = this.tempAdd[name];
      }
    },
    resetAddObj() {
      for (name in this.tempAdd) {
        this.addObj[name] = this.tempAdd[name];
      }
    },
    resetEditObj() {
      for (name in this.tempEdit) {
        this.editObj[name] = this.tempEdit[name];
      }
    }
  },
  mounted() {

    // 复制给临时的对象，验证成功之后重置默认值
    for (name in this.editObj) {
        this.tempEdit[name] = this.editObj[name];
    }
    for (name in this.addObj) {
        this.tempAdd[name] = this.addObj[name];
    }
  },
  computed: {
    editError(errors) {
      return this.errors.items.filter(e => { return e.scope == "edit" }).length > 0;
    },
    addError(errors) {
      return this.errors.items.filter(e => { return e.scope == "add" }).length > 0;
    }
  },

}