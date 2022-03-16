var express = require('express');
var app = express();
var fs = require("fs");
const { getItem } = require('./db');

const db = require('./db')
const WEB_ROOT = "/web/"


app.get('/', function(req, res){
	res.sendFile(`${__dirname}` + WEB_ROOT + 'index.html');
});

app.get('/:filePath', function(req, res){
	res.sendFile(`${__dirname}` + WEB_ROOT + req.params.filePath);
});

//http://localhost:8081/api/users/create?email=adityang5@gmail.com&password=12345678
app.get ('/api/users/create', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	res.status(200).send(db.createUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/set?user_uuid=537c0d73-0167-487b-a794-aa07d63b3510&email=adityang5@gmail.com&password=12345678
app.get ('/api/users/set', (req, res) => { res.header("Access-Control-Allow-Origin", "*");0
	res.status(200).send(db.setUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/delete?user_uuid=9963c6b8-fc39-41b0-b169-a1a7af05c4fc&email=adityang5@gmail.com&password=12345678
app.get ('/api/users/delete', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query)
	res.status(200).send(db.deleteUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/search?email=adityang5@gmail.com
app.get ('/api/users/search', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query);
	db.searchUsers(req.query).then( (v, e) => {
		res.status(200).send(v);
		res.end();
	})
});

//http://localhost:8081/api/users/login?email=adityang5@gmail.com&password=12345678
app.get ('/api/users/login', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log("Login GET")
	console.log(req.body);
	console.log(req.query);
	db.getUser(req.query).then((user_res, e) => {
		if (e)
			console.log(e)
			
		if (user_res.length == 0)
			user_res = {error: "Login Failed"}
		else
			user_res = user_res[0]
		
		console.log(user_res)
		res.status(200).send(user_res);
		res.end();
	}).catch(e => {
		if (e)
			console.log(e)
			
		res.status(300).send(e);
		res.end();
	})
});

// POST Methods
//http://localhost:8081/api/users/create?email=adityang5@gmail.com&password=12345678
app.post ('/api/users/create', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log("Create")
	console.log(req)
	res.status(200).send(db.createUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/set?user_uuid=537c0d73-0167-487b-a794-aa07d63b3510&email=adityang5@gmail.com&password=12345678
app.post ('/api/users/set', (req, res) => { res.header("Access-Control-Allow-Origin", "*");0
	res.status(200).send(db.setUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/delete?user_uuid=9963c6b8-fc39-41b0-b169-a1a7af05c4fc&email=adityang5@gmail.com&password=12345678
app.post ('/api/users/delete', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query)
	res.status(200).send(db.deleteUser(req.query));
	res.end();
});

//http://localhost:8081/api/users/search?email=adityang5@gmail.com
app.post ('/api/users/search', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query);
	res.status(200).send(db.searchUsers(req.query));
	res.end();
});

//http://localhost:8081/api/users/login?email=adityang5@gmail.com&password=12345678
app.post ('/api/users/login', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log("Login")
	console.log(req.body);
	console.log(req.query);
	db.getUser(req.query).then((user_res, e) => {
		if (e)
			console.log(e)

		if (user_res.length == 0)
			user_res = {error: "Login Failed"}

		console.log(user_res)
		res.status(200).send(user_res);
		res.end();
	}).catch(e => {
		if (e)
			console.log(e)

		res.status(300).send(e);
		res.end();
	})
});

//http://localhost:8081/api/cart?cart_uuid=537c0d73-0167-487b-a794-aa07d63b3510
app.get ('/api/cart', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	db.getCart(req.query).then( (search, e) => {
		if (search.length==0)
			res.status(200).send({error : "cart not found"})
		else {
			res.status(200).send(search);
		}
		res.end();
	})
});

app.get ('/api/cart/add', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	db.addToCart(req.query).then( (v, e) => {
		res.status(200).send({
			operation: 'addToCart'
		});
		res.end();
	})
});

app.get ('/api/cart/remove', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	db.removeFromCart(req.query).then( (v, e) => {
		res.status(200).send({
			operation: 'removeFromCart'
		});
		res.end();
	})
});

//http://localhost:8081/api/item?item_uuid=81242fa2-7344-454e-b320-2ddc06424281
app.get ('/api/item', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	search = db.getItem(req.query)
	if (search==null)
		res.status(404).send({error : "item not found"})
	else
		res.status(200).send(search);
	res.end();
});

//http://localhost:8081/api/item/search?name=Water%20Bottle
app.get ('/api/item/search', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query);
	db.searchItems(req.query).then((v, e) => {
		for (i in v) {
			v[i]['type'] = {
				'type_uuid': v[i].type_uuid,
				'type_name': v[i].type_uuid.split("_")[1]
			}
			v[i]['type_name'] = v[i].type_uuid.split("_")[1]
			v[i]['name'] = v[i].item_name
			v[i]['description'] = v[i].item_description
			
		}
		
		//console.log(v)
		res.status(200).send(v);
		res.end();
	})
});

//http://localhost:8081/api/type
app.get ('/api/type', (req, res) => { res.header("Access-Control-Allow-Origin", "*");
	res.status(200).send(db.getAllTypes());
	res.end();
});

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})
