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

// Admin
app.get('/admin', (req, res) => {
    res.render('admin/login-admin.ejs');
});

app.get('/dashboard', (req,res) => {
    connection.query('select * from tb_toko', (err, results) => {
        if (err) {
            throw error;
        }
        res.render('admin/index-admin.ejs', {items:results});
    });
});

app.get('/edit-profil-toko', (req,res) => {
    res.render('admin/editProfil.ejs');
});

app.post('/edit', (req,res) => {
    var nama = req.body.nama_toko;
    var alamat = req.body.alamat_toko;
    var deskripsi = req.body.deskripsi_toko;
    var nomor = req.body.nomor_telepon;
    var email = req.body.email;

    connection.query ('UPDATE tb_toko SET nama_toko=?, alamat_toko=?, deskripsi_toko=?, nomor_telepon=?, email=? WHERE id_toko=1', [nama],[alamat],[deskripsi],[nomor],[email], (error, results) => {
        if (error) {
            throw error;
        }

        // isi method get (index)
        res.redirect('/dashboard');
    });
});

app.get('/asset', (req,res) => {
    res.render('admin/assets.ejs')
});

app.get('/databarang', (req,res) => {
    res.render('admin/dataBarang.ejs')
});

app.get('/kategori', (req,res) => {
    res.render('admin/kategori.ejs')
});

app.get('/approve', (req,res) => {
    res.render('admin/approve.ejs')
});

app.get('/laporanPenjualan', (req,res) => {
    res.render('admin/lapPenjualan.ejs')
});

app.get('/tambahAset', (req,res) => {
    res.render('admin/tambahAset.ejs')
});

app.get('/tambahDatabarang', (req,res) => {
    res.render('admin/tambahData.ejs')
});

app.get('/tambahKategori', (req,res) => {
    res.render('admin/tambahKategori.ejs')
});

app.get('/tambahJenis', (req,res) => {
    res.render('admin/tambahJenis.ejs')
});

app.get('/detailLaporan', (req,res) => {
    res.render('admin/detailLaporan.ejs')
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

 app.use(express.urlencoded({extended:false}));