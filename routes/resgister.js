var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var connection  = require('../library/db');

/* GET home page. */
router.get('/signup', function(req, res, next) {
            res.render('signup',
            {
                title: "Sign up"
            });
        
});

router.post('/addstudent',(req, res, next)=>{
    let data = {
        first_nm: req.body.first_nm,
        last_nm: req.body.last_nm,
        user_nm: req.body.user_nm,
        password: req.body.password               
    }  
        let sqlQuery = "INSERT INTO students SET ?" 
        connection.query(sqlQuery,data, function(err,result){
        if(err) throw err
        res.redirect('/');   
    });   
})
module.exports = router;