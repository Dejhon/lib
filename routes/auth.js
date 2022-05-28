var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var connection  = require('../library/db');

router.post('/studentlogin/', function(req, res, next) {
   
        var username = req.body.user_name;
        var password = req.body.password;
        connection.query('SELECT * FROM students WHERE BINARY user_nm = ? AND BINARY password = ?', [username, password], function(err, rows, fields) {
            if(err) throw err
                if (rows.length <= 0) {
                    res.redirect('/login/student')
                }
                else {
                    req.session.loggedin = true;
                    req.session.user_nm = username;
                       res.redirect('/books/bk')
                    }            
                })                    
})
router.get('/logout', function (req, res) {
   req.session.destroy(()=>{
       res.redirect('/login/student')
   });
});

// router.post('/adminlogin/', function(req, res, next) {
   
//     var username = req.body.user_name;
//     var password = req.body.password;
//     connection.query('SELECT * FROM admin WHERE BINARY admin_user_nm = ? AND BINARY admin_password = ?', [username, password], function(err, rows, fields) {
//         if(err) throw err
//         // if user not found
//             if (rows.length <= 0) {
//                 // req.flash('error', 'Please correct enter email and Password!')
//                 res.redirect('/user/adminlogin')
//             }
//             else { // if user found
//         // render to views/user/edit.ejs template file
//                 req.session.loggedin = true;
//                 req.session.admin_user_nm = username;
//                 // req.session.id = req.params.id;
//                    res.redirect('/admin')
//                 }            
//             })                    
// })

// router.get('/adminlogout', function (req, res) {
// req.session.destroy(()=>{
//    res.redirect('/user/adminlogin')
//  });
// });

module.exports = router;