
const router = require("./_router");

// filter
require("./filter");

router.get("/index",(req,res)=>{
    res.render("admin/index");
    return;  

});
// user
//require("./user");

// userRule
require("./userRule");


module.exports = router;