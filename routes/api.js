var express = require('express');
var router = express.Router();
const {getMultiple} = require("../services/boats");

/* GET home page. */
router.get('/', async function (req, res, next) {


    return res.json(await getMultiple())
});

module.exports = router;
