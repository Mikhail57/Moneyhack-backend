const express = require("express")
const Web3 = require("web3")
const bodyParser = require('body-parser')

const app = express()
const web3 = new Web3()

const contract = require("./contract")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const { eth } = web3;
web3.setProvider(new web3.providers.HttpProvider("http://185.125.219.98:8545"));

const infoContract = eth.contract(contract.ABI).at(contract.address);

app.post("/set", function (req, res) {
	var obj = req.body;
	var id = obj.id;
	var pass = obj.pass;
	var data = obj.data;

	var array = {};

	for (var i in data) {
		var type = data[i].type;
		var value = data[i].value;
		var time = data[i].time;

		if (array[type] == null)
			array[type] = value+":"+time+",";
		else
			array[type] += value+":"+time+",";
	}

	console.log("Yet another post request...");

	const { personal } = web3;
	personal.unlockAccount(id, pass, 10);


	for (var i in array) {
		var t = infoContract.getData.call(id, i);
		console.log(t);
		array[i] = t + array[i];
		console.log(array[i]);
	}
	console.log(array);
})

app.listen(8080)