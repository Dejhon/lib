var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
            res.render('index',
            {
                page_title: "Amber Cohort 2 - Home Page"
            });
        
    });
module.exports = router;