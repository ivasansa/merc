/**
 * Created by atulr on 05/07/15.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
//   MongoClient.connect('mongodb://'+connection_string, function(err, db) {
//   if(err) throw err;
//   var collection = db.collection('books').find().limit(10).toArray(function(err, docs) {
//     console.dir(docs);
//     db.close();
//   })
// })
  res.render("index", {title: "ivan"});
  // res.render("indexc9", {name: "ivan"});
});

router.get('/c9', function(req, res, next) {
  res.render("indexc9", {name: "ivan"});
});

  

module.exports = router;  