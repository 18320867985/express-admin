var express = require('express');
var router = express.Router();


/* GET home page. */
var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];
router.get('/', async function(req, res, next) {
  res.render('admin/index', {items:items});
});

router.get('/json', async function(req, res) {
  res.json(items);
});

module.exports = router;
