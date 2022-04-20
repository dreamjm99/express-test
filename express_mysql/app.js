const path = require('path')
const express = require('express') 
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db'
});

app.listen(port , () => console.log(`Example app listening on port ${port}!`))

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine' ,'ejs');

//insert form
// app.get('/', (req,res) => 
//     res.sendFile(path.join(__dirname, "html/form.html")))

// app.post('/', (req, res) =>{
//     const sql = "INSERT INTO users SET ?"

//     con.query(sql,req.body,function(err,result,fields){
//         if (err) throw err;
//         console.log(result)
//         res.send('등록이 완료 되었습니다');
//     });
// });




//list_form
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.get('/', (req, res) => { //select
    const sql = "select * from users"
    con.query(sql , function (err, result, fields){
        if (err) throw err;
        res.render('index', {users : result});
    });
});












