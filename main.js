var express=require('express');
var app=express();

var multer  = require('multer')
var upload = multer();

app.use(upload.array());
var router=require('./routes');

app.use('',router);
console.log('Tharmaraj Test2');
app.listen(3000);