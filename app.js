const express = require('express');
const app = express();
// Menentukan server port
app.listen(3000, ()=> {
    console.log('server running on port 3000');
});
// Agar server mengenali folder public
app.use(express.static('public'));
app.get('/', (req, res) => {
        res.render('login.ejs');
});
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});
app.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword.ejs');
});
app.post('/submit', (req, res) => {
    res.render('index.ejs');
});
app.post('/', (req, res) => {
    res.render('login.ejs');
});
app.get('/cart', (req, res) => {
    res.render('cart.ejs');
});
app.get('/about', (req, res) => {
    res.render('about.ejs');
});
app.get('/detail', (req, res) => {
    res.render('detail.ejs');
});
app.get('/index', (req, res) => {
    res.render('index.ejs');
});
app.get('/pembelian', (req, res) => {
    res.render('pembelian.ejs');
});

//Database
var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'waroeng'
 });
connection.connect(function(err){
   if(err){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  