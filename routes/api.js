var express = require('express');
var router = express.Router();
const {getMultiple, getLimited} = require("../services/boats");

/* GET home page. */
router.get('/', async function (req, res, next) {
    return res.json(await getMultiple())
});
router.get('/2', async function (req, res, next) {
    return res.json(await getLimited(100))
});

module.exports = router;
