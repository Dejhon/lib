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

router.post('/borrow',(req, res, next)=>{

    /** To calculate due date **/
    let today = new Date();
    var fortnightAway = new Date(Date.now() + 12096e5)
    /****/

    let data = {
        student_id: req.session.user_id,              
        bk_id: req.body.book_id,              
        bk_cost: req.body.price,     
        daterented: today,
        due_date: fortnightAway        
    }  
        let sqlQuery = "INSERT INTO checkout SET ?" 
        connection.query(sqlQuery,data, function(err,result){
        if(err) throw err
        res.redirect('/cart/rental');   
    });   
})

module.exports = router;