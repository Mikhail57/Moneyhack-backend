const express = require("express")
const Web3 = require("web3")
const bodyParser = require('body-parser')

const app = express()
const web3 = new Web3()

const contract = require("./contract")

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const { eth } = web3;
web3.setProvider(new web3.providers.HttpProvider("http://185.125.219.98:8545"));

const infoContract = eth.contract(contract.ABI).at(contract.address);

const types = ["temperature", "sugar", "pressure", "hrate"];

app.get("/get", function (req, res) {
	console.log("Yet another get request...");

	var id = req.query.id;
	var pass = req.query.pass;

	const { personal } = web3;
	personal.unlockAccount(id, pass, 10);

	var outJson = {};
	outJson["measurements"] = [];

	for (var piz in types) {
		i = types[piz];
		var ij = {};
		ij["type"] = i;

		var str = infoContract.getData(id, i);
		console.log(i+":"+str);
		if (str.length == 0) {
			continue;
		}
		str = '"'+str.substring(0,str.length-1).replace(/\:/g, '":"').replace(/\,/g, '","')+'"';
		var json = JSON.parse("{"+str+"}");

		var vj = [];
		for (var j in json) {
			vj.push({"time":json[j], "value": j});
		}
		ij["values"] = vj;
		outJson["measurements"].push(ij);
	}
	
	res.send(outJson);
})

app.listen(8000)