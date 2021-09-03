var express = require('express');
var boats = require('../services/boats')
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    // console.log(JSON.stringify(await boats.getMultiple()));
    render('index.twig', {value: JSON.stringify(await boats.getMultiple())}, res);
});

module.exports = router;
