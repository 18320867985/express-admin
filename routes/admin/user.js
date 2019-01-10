
const router = require("./_router");
const mainModel=require("../../models/main");

router.get("/user", async (req, res) => {

    res.render("admin/user.html");
});

router.get("/user/data", async (req, res) => {

   let list = await  mainModel.User.find().populate("roleId","name code");
    res.json(res.ok(list));
});

router.post("/user/data",  async(req, res) => {
        res.json(res.ok("post"));
});

router.put("/user/data", async(req, res) => {
    
    let id=req.body._id;
    let roleId=req.body.roleId;
    let v= await  mainModel.User.findByIdAndUpdate(id,{$set:{ roleId}},{new:true});
    if(!v){
        res.json(res.err("修改失败"));
        return;
    }else{
        res.json(res.ok(v))
    }
});

router.delete("/user/data/:id", async (req, res) => {
    let id=req.params.id
    let  obj= await  mainModel.User.findByIdAndDelete(id).catch(err=>{});
   
    if(!obj){
        res.json(res.err());
        return;
    }
    res.json(res.ok());

});


module.exports = router;