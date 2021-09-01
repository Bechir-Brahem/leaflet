var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    render('index.twig',{value:44},res);
});

module.exports = router;
