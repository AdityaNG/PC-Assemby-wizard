var express = require('express');
var app = express();
var fs = require("fs");

const db = require('./db')
const WEB_ROOT = "/web/"


app.get('/', function(req, res){
	res.sendFile(`${__dirname}` + WEB_ROOT + 'index.html');
});

app.get('/:filePath', function(req, res){
	res.sendFile(`${__dirname}` + WEB_ROOT + req.params.filePath);
});

//http://localhost:8081/api/users/create?email=adityang5@gmail.com&password=12345678
app.get ('/api/users/create', (req, res) => {
	res.status(200).send(db.createUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/set?user_uuid=537c0d73-0167-487b-a794-aa07d63b3510&email=adityang5@gmail.com&password=12345678
app.get ('/api/users/set', (req, res) => {0
	res.status(200).send(db.setUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/delete?user_uuid=9963c6b8-fc39-41b0-b169-a1a7af05c4fc&email=adityang5@gmail.com&password=12345678
app.get ('/api/users/delete', (req, res) => {
	console.log(req.query)
	res.status(200).send(db.deleteUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/search?email=adityang5@gmail.com
app.get ('/api/users/search', (req, res) => {
	console.log(req.query);
	res.status(200).send(db.searchUsers(req.query));
	res.end();
});

//http://localhost:8081/api/cart?cart_uuid=537c0d73-0167-487b-a794-aa07d63b3510
app.get ('/api/cart', (req, res) => {
	search = db.getCart(req.query)
	if (search==null)
		res.status(404).send({error : "cart not found"})
	else
		res.status(200).send(search);
	res.end();
});

//http://localhost:8081/api/cart/set?cart_uuid=537c0d73-0167-487b-a794-aa07d63b3510&items=1,2,3,4
app.get ('/api/cart/set', (req, res) => {
	res.status(200).send(db.setCart(req.query));
	res.end();
});

//http://localhost:8081/api/cart/delete?user_uuid=9963c6b8-fc39-41b0-b169-a1a7af05c4fc&email=adityang5@gmail.com&password=12345678
app.get ('/api/cart/delete', (req, res) => {
	console.log(req.query)
	res.status(200).send(db.deleteCart(req.query));
	res.end();
});

//http://localhost:8081/api/item?item_uuid=81242fa2-7344-454e-b320-2ddc06424281
app.get ('/api/item', (req, res) => {
	search = db.getItem(req.query)
	if (search==null)
		res.status(404).send({error : "item not found"})
	else
		res.status(200).send(search);
	res.end();
});

//http://localhost:8081/api/item/search?name=Water%20Bottle
app.get ('/api/item/search', (req, res) => {
	console.log(req.query);
	res.status(200).send(db.searchItems(req.query));
	res.end();
});

//http://localhost:8081/api/type
app.get ('/api/type', (req, res) => {
	res.status(200).send(db.getAllTypes());
	res.end();
});

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})
