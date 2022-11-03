const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const mysql=require('mysql');
// Menentukan server port
app.listen(3280, ()=> {
    console.log('server running on port 3280');
});

// Agar server mengenali folder public
app.use(express.static('public'));

//Database
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
 var connection=mysql.createConnection({
   host:'127.0.0.1',
   user:'root',
   password:'',
   database:'waroeng'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
//Sessioning
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
 // routing
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
    let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/index');
			} else{
				res.send('alert("error woy");window.location.href = "/login.ejs";');
			}
			res.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post('/', (req, res) => {
	console.log("Im here");
	console.log(req.body.namaLengkap);
	console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.email);
    connection.connect(function (err) {
        // if (err) throw err;
        console.log("connected");
        var sql = "INSERT INTO users (nama_lengkap,username,email,password) VALUES ('" + req.body.namaLengkap + "','" + req.body.username + "','" + req.body.email + "', '" + req.body.password + "')";
		console.log(sql);
		connection.query(sql, function (err) {
            if (err) throw err;
            console.log("table created");
        });
    });
    res.redirect('/');
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
    // If the user is loggedin
	if (req.session.loggedin) {
		// Output username
        res.render('index.ejs');
	} else {
		// Not logged in
		res.send('/');
	}
	res.end();
});
app.get('/pembelian', (req, res) => {
    res.render('pembelian.ejs');
});

app.get('/admin', (req, res) => {
    res.render('admin/login-admin.ejs');
});
app.post('/submitA',(req,res)=>{
    let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM admin WHERE username =? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/dashboard');
			} else{
				res.send('alert("error woy");window.location.href = "/login.ejs";');
			}
			res.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
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
app.get('/kodeambil', (req,res) => {
    res.render('kodeambil.ejs')
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