var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var connection  = require('../library/db');


router.get('/bk', function(req, res, next){

    let sql = `SELECT tr.first_nm AS First_Name, bk.title AS Book,  date_format(ck.due_date, '%Y-%m-%d') AS duedate, date_format(ck.daterented, '%Y-%m-%d') AS Date_Rented, ck.bk_cost AS Price, ck.status AS Status, ck.id AS ID_num FROM librarysystem.checkout AS ck JOIN librarysystem.students AS tr ON ck.student_id = tr.id JOIN librarysystem.books AS bk ON ck.bk_id = bk.id`;
    connection.query(sql, (err, rows)=>{
        if(err) throw err
        res.render('rentedbooks',{
            title:"Rented Books",
            data: rows,
            user: req.session.user_nm,
            today: new Date()
        });
    });
});

router.get('/edit/:id', (req,res,next)=>{
    let sql = `SELECT id, status FROM checkout  WHERE id = ${req.params.id}`;
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.render('statusedit',{
            title: 'Update Status',
            book: result[0]            
        });
    });
})


router.post('/update',(req, res)=>{
    const id = req.body.id;    
    let sql = "UPDATE checkout SET status='" +req.body.status+"' WHERE  id= "+id; 
    connection.query(sql, (err,result)=>{
        if(err) throw err;
        res.redirect('/rent/bk');
    });
});

module.exports = router