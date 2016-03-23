/**
 * Created by atulr on 05/07/15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("indexc9", {name: "ivan"});
});

router.get('/c9', function(req, res, next) {
  res.render("indexc9", {name: "ivan"});
});

module.exports = router;