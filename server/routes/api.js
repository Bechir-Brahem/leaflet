var express = require('express');
var router = express.Router();
var boats = require('../services/boats')

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.json(await boats.getMultiple());
});

module.exports = router;
