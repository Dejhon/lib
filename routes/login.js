var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var connection  = require('../library/db');

router.get('/student', function(req, res, next){
    res.render('studentlogin',{
        title:'Login',
        // users: rows
    });
});

router.get('/administration', function(req, res, next){
    res.render('adminlogin',{
        title:'Login',
        // users: rows
    });
});

module.exports = router;
