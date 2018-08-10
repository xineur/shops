var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.get('/',(req,res,next)=>{
	const html = fs.readFileSync(path.resolve(__dirname, './src/index.html'), 'utf-8')
    res.send(html)
});

app.listen(3389,function(){
	console.log('localhost:3389')
})