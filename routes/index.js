var router = require('./_router');

/* GET home page. */
router.get('/', async function (req, res) {
  res.redirect("admin/index");
  return;
});

require("./login");
require("./reg");

module.exports = router;
