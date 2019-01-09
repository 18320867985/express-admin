const router = require("./_router");
const mainModel=require("../../models/main");

router.get("/userRole",(req,res)=>{

    res.send("userRole");
     return;
});

router.get("/userRole/data",async (req,res)=>{
  let userRoles= await mainModel.UserRole.find().sort({_id:-1}).catch(err=>{});
  if(!userRoles){
    userRoles=[];
  }
    res.json(res.ok(userRoles));
});


module.exports=router;