 let router = require('./_router');
 const mainModel=require("../models/main");
 const  help=require("../lib/dbHelp");


/* GET home page. */
router.get('/', async function (req, res) {
  help.db(function(data){
    console.log(data)
  })
  
    
 res.redirect("admin/index");
});


require("./login");
require("./reg");

module.exports = router;
