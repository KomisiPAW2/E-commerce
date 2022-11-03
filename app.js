const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.listen(3000, ()=> {
    console.log('server running on port 3000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/index', (req, res) => {
    res.render('index.ejs')
});

app.get('/assets', (req, res) => {
    res.render('assets.ejs')
});

app.get('/dataBarang', (req, res) => {
    res.render('dataBarang.ejs')
});

app.get('/kategori', (req, res) => {
    res.render('kategori.ejs')
});

app.get('/approve', (req, res) => {
    res.render('approve.ejs')
});

app.get('/lapPenjualan', (req, res) => {
    res.render('lapPenjualan.ejs')
});

app.get('/editProfil', (req, res) => {
    res.render('editProfil.ejs')
});

app.get('/tambahAset', (req, res) => {
    res.render('tambahAset.ejs')
});

app.get('/tambahData', (req, res) => {
    res.render('tambahData.ejs')
});

app.get('/tambahKategori', (req, res) => {
    res.render('tambahKategori.ejs')
});

app.get('/tambahJenis', (req, res) => {
    res.render('tambahJenis.ejs')
});

app.get('/detailLaporan', (req, res) => {
    res.render('detailLaporan.ejs')
});