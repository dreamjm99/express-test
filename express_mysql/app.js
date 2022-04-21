const path = require('path')
const express = require('express') 
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 3000




app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine' ,'ejs');

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db'
});



con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.get('/', (req, res) => { //select 리스트조회
    const sql = "select * from users";
    con.query(sql , function (err, result, fields){
        if (err) throw err;
        res.render('index', {users : result});
    });
});

app.post('/', (req,res) => {
    const sql = "INSERT INTO users set ?"
    con.query(sql,req.body,function(err,result,fields){
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

app.get('/create', (req,res) =>
    res.sendFile(path.join(__dirname, 'html/form.html')))



app.get('/delete/:id',(req,res) =>{//삭제
    const sql = "DELETE FROM users WHERE id = ?"; 
    con.query(sql,[req.params.id],function(err,result,fields){
        if (err) throw err;
        console.log(result);
        res.redirect('/')
    });
});

app.post('/update/:id',(req,res)=>{//회원정보 수정
    const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
    con.query(sql,req.body,function (err,result,fields){
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => { //수정할 회원정보 조회
    const sql = "SELECT * FROM users WHERE id=?";
    con.query(sql ,[req.params.id],function (err, result, fields){
        if (err) throw err;
        res.render('edit', {user : result});
    });
});


app.listen(port , () => console.log(`Example app listening on port ${port}!`))//서버 실행











