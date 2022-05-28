var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var connection  = require('../library/db');


router.get('/bk', function(req, res, next){

    let sql = `SELECT * FROM books`;
    connection.query(sql, (err, rows)=>{
        if(err) throw err
        res.render('books',{
            data: rows,
            user: req.session.user_nm
        });
    });
});

module.exports = router;