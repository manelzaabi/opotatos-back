var express = require('express');
var router = express.Router();
// Sample data for the menu (replace this with your actual data retrieval logic)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
