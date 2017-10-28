const express = require("express")
const bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.post("/set", function (req, res) {
	var obj = req.body;
	log(obj);
})

app.listen(8080)