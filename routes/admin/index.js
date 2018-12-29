var express = require('express');
module.exports = router = express.Router();

router.get("/",(req,res)=>{

    res.render("admin/index");

});
// filter
require("./filter");

// user
require("./user");

// userRule
require("./userRule");

