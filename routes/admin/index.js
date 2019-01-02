
const router = require("./_router");

// filter
require("./filter");

router.get("/index",(req,res)=>{
    res.render("admin/index",{});
    return;  

});

router.get("/index/data",(req,res)=>{
    if(req.session.login&&req.session.login.isLogin){
        res.json(res.successData(req.session.login.user));
        return;  
    }else{
        res.json(res.errorData());
        return;  
    }
   
});


// user
require("./user");

// userRule
require("./userRule");


module.exports = router;