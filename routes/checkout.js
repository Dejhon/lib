var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var connection  = require('../library/db');

router.get('/rental', function(req, res, next) {
   let sql = `SELECT tr.first_nm AS First_Name, bk.title AS Book,  ck.due_date AS duedate, ck.bk_cost AS Price, ck.status AS Status FROM librarysystem.checkout AS ck JOIN librarysystem.students AS tr ON ck.student_id = tr.id JOIN librarysystem.books AS bk ON ck.bk_id = bk.id WHERE ck.student_id = ${ req.session.user_id}`;

   connection.query(sql, (err, rentalbk)=>{
       if(err) throw err
       res.render('checkout',{
           data: rentalbk,
           title: "My Cart"
       });
   });                  
})

module.exports = router;
