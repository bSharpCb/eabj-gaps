var express = require('express');
const questions = require('../public/lib/clues.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { board: questions });
});

module.exports = router;
