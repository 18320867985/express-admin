 let router = require('./_router');
 const mainModel=require("../models/main");
 const  help=require("../lib/dbHelp");


/* GET home page. */
router.get('/', async function (req, res) {
 res.redirect("admin/index");
  return;
});


require("./login");
require("./reg");

module.exports = router;
