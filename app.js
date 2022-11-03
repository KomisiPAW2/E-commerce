const express = require('express');  // modul express
const app = express(); // mengganganti express -> app
const session = require('express-session'); // express session
const path = require('path'); // membaca method path 
const mysql=require('mysql'); // modul mysql

// Menentukan server port
app.listen(3280, ()=> {
    console.log('server running on port 3280');
});

// Agar server mengenali folder public
app.use(express.static('public'));

//Database
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets'); //mengambil aturan eropa barat
var connection=mysql.createConnection({
   host:'127.0.0.1', // server localhost
   user:'root',
   password:'',
   database:'waroeng' // nama database
});

// mengecek koneksi database
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
		res.send('Please enter Username and Password!');
		res.end();
	}
});

// post laman signup
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

//routing laman cart
app.get('/cart', (req, res) => {
    res.render('cart.ejs');
});

// routing laman about
app.get('/about', (req,res) => {
    connection.query('select * from tb_toko', (err, results) => {
        if (err) {
            throw error;
        }
        res.render('about.ejs', {items:results});
    });
});

// routing laman detail
app.get('/detail', (req, res) => {
    var id = req.params.id
    connection.query('select * from produk where id_produk = ?', [id], (err,results) => {
        if(err) {throw err;}
        res.render('detail.ejs', {detils:results});  
    })
});

app.get('/index', (req, res) => {
    // If the user is loggedin
	if (req.session.loggedin) {
		// Output username
        connection.query('select * from produk', (err, results) => {
            if (err) {
                throw error;
            }
            res.render('index.ejs', {produks:results});
        });
	} 
    else {
		// Not logged in
		res.send('/');
	}
	// res.end();
});
app.get('/pembelian', (req, res) => {
    res.render('pembelian.ejs');
});

app.get('/histori', (req,res) => {
    res.render('history.ejs');
});

// admin
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

// ngepost laman edit saat di connect query database
app.post('/edit', (req,res) => {
    var nama = req.body.namaToko;
    var alamat = req.body.alamatToko;
    var deskripsi = req.body.deskripsiToko;
    var nomor = req.body.nomorTelepon;
    var email = req.body.email;

    connection.query ('UPDATE tb_toko SET nama_toko=?, alamat_toko=?, deskripsi_toko=?, nomor_telepon=?, email=? WHERE id_toko=1', [nama, alamat, deskripsi, nomor, email], (error, results) => {
        if (error) {
            throw error;
        }

        // isi method get (index)
        res.redirect('/dashboard');
    });
});

// ngambil laman assets
app.get('/asset', (req,res) => {
    connection.query('select * from asset', (err, results) => {
        if (err) {
            throw error;
        }
        res.render('admin/assets.ejs', {fotos:results});
    });
});
// post tambah asset
app.post('/tambah-asset', (req,res) => {
    var nama = req.body.namaField;
    var foto = req.body.foto;
    connection.query('insert into asset(nama_asset, foto) values (?, ?)', [nama, foto], (error, results) => {
        if (error) {
            throw error;
        }

        // isi method get (index)
        res.redirect('/asset');
    })
});

app.get('/hapusAsset', (req,res) => {
    var id = req.body.id;

    connection.query ('SELECT * FROM asset', (error, results) => {
        if (error) {
            throw error;
        }

        // isi method get (index)
        res.render('admin/hapusAsset.ejs', {assets:results});
    });
});

app.post('/hapus-asset', (req,res) => {
    var id = req.body.asset;

    connection.query ('DELETE FROM asset WHERE id_asset=?',[id], (error, results) => {
        if (error) {
            throw error;
        }

        // isi method get (index)
        res.redirect('/asset');
    });
});

app.get('/kodeambil', (req,res) => {
    res.render('kodeambil.ejs')
});

app.get('/databarang', (req,res) => {
    connection.query('select produk.id_produk, Nama_Produk, Jumlah, Deskripsi, jenis_barang.nama_jenis AS jenis_barang, Satuan, foto, harga_beli, harga_jual From produk LEFT JOIN  jenis_barang on produk.id_jenis = jenis_barang.id_JenisBarang;', (err, results) => {
        if (err) {
            throw error;
        }
        res.render('admin/dataBarang.ejs', {produks:results});
    });
});

app.post('/tambah-data', (req,res) => {
    var nama = req.body.namaProduk;
    var jumlah = req.body.jumlah;
    var satuan = req.body.satuan;
    var deskripsi = req.body.deskripsi;
    var jenis = req.body.jenis;
    var hargaJual = req.body.hargaJual;
    var hargaBeli = req.body.hargaBeli;
    var foto = req.body.foto;

    connection.query('insert into produk(Nama_Produk, Jumlah, Satuan, Deskripsi, foto, harga_beli, harga_jual, id_jenis) values (?, ?, ?, ?, ?, ?, ?, ?)', [nama, jumlah, satuan, deskripsi, foto, jenis, hargaBeli, hargaJual], (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect('/databarang');
    })
});

app.get('/hapusBarang', (req,res)=>{
    connection.query('select * from produk', (err, results)={
        if (err) {
            throw err;
        }
        
    })
})

app.get('/kategori', (req,res) => {

    connection.query('select jenis_barang.id_JenisBarang, jenis_barang.nama_jenis AS jenis, kategori_barang.id_kategori, kategori_barang.nama_kategori AS kategori FROM jenis_barang left join kategori_barang on jenis_barang.id_kategori = kategori_barang.id_kategori ', (err, results)=> {
        if (err) {
            throw error;
        }
        res.render('admin/kategori.ejs', {jenises:results});
    });
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
    connection.query('SELECT * FROM jenis_barang', (err, results) => {
        if (err) {
            throw error;
        }
        res.render('admin/tambahData.ejs', {jenises:results});
    });
});

app.get('/tambahKategori', (req,res) => {
    connection.query('SELECT * FROM kategori_barang', (err, results) => {
        if (err) {
            throw error;
        }
        res.render('admin/tambahKategori.ejs', {kategoris:results});
    });
});

app.post('/procTambahJenis', (req,res) => {
    var nama = req.body.namaJenis;
    var kategori = req.body.kategori_barang;
    connection.query('INSERT INTO jenis_barang(nama_jenis, id_kategori) values (?, ?)', [nama,kategori], (err, results)=>{
        if (err) {
            throw error;
        }
        res.redirect('/kategori');
    });
});

app.post('/procTambahKategori', (req,res) => {
    var nama = req.body.kategori;
    connection.query('INSERT INTO kategori_barang(nama_kategori) values (?)', [nama], (err, results)=>{
        if (err) {
            throw error;
        }
        res.redirect('/kategori');
    });
});

app.get('/tambahJenis', (req,res) => {
    res.render('admin/tambahJenis.ejs')
});

app.get('/detailLaporan', (req,res) => {
    res.render('admin/detailLaporan.ejs')
});
