
const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/user", async (req, res) => {

    res.render("admin/user.html");
});

router.get("/user/data/dtl/:ids", async (req, res) => {
    let ids=req.params.ids||"";
    ids=ids.split(",");
   let list = await  mainModel.User.find({_id:{
       $in:ids
   }}).populate("roleId","name code");
    res.json(res.ok(list));
});

router.get("/user/data/:index/:pageItem", async (req, res) => {

    // paging start
    let index = Number(req.params.index) || 1;
    let pageItem = Number(req.params.pageItem) || 10;
    let count = await mainModel.User.countDocuments(); //edit line
    let maxIndex = Math.ceil(count / pageItem);
    index = index > maxIndex ? maxIndex : index;
    let index2 = (index - 1) * pageItem;
    // paging end

    let list = await mainModel.User.find({}).populate("roleId", "name code").skip(index2).limit(pageItem);

    res.json(res.ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});
router.post("/user/data", async (req, res) => {
    res.json(res.ok("post"));
});

router.put("/user/data", async (req, res) => {

    let id = req.body._id;
    let roleId = req.body.roleId;
    try {
        roleId = mainModel.orm.mongoose.Types.ObjectId(roleId).toHexString();
    } catch (error) {
        res.json(res.err("用户类型 roleId 有误！"));
        return;
    }
    let v = await mainModel.User.findByIdAndUpdate(id, { $set: { roleId } }, { new: true });
    if (!v) {
        res.json(res.err("修改失败"));
        return;
    } else {
        res.json(res.ok(v))
    }
});

router.delete("/user/data/:listId", async (req, res) => {
   // let id = req.params.id;
    let listId=req.params.listId||"";
    listId=listId.split(",")
    let obj = await mainModel.User.deleteMany({
        _id:{
            $in:listId
        }
    }).catch(err=>{});

    if (!obj) {
        res.json(res.err());
        return;
    }
    res.json(res.ok(obj));

});


module.exports = router;