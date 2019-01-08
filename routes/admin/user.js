
const router = require("./_router");
const mainModel=require("../../models/main");

router.get("/user", (req, res) => {
  
    res.render("admin/user.html");
   
});

router.get("/user/data", async (req, res) => {
   let list = await  mainModel.User.find().populate("roleId","name code");
     res.json(res.ok(list));
});

router.post("/user/data", (req, res) => {
 
    res.send("user");

});

router.put("/user/data", (req, res) => {

    res.send("user");

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