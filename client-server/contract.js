const ABI = [ { "constant": false, "inputs": [ { "name": "_newOwner", "type": "address" } ], "name": "setOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "whom", "type": "address" }, { "name": "sensorName", "type": "string" } ], "name": "getData", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xf04420392dfa5a787b28cab1dd42413b65a8f11c" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "name", "type": "string" }, { "name": "data", "type": "string" } ], "name": "replaceData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "viewer", "type": "address" } ], "name": "approve", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "old", "type": "address" }, { "indexed": true, "name": "current", "type": "address" } ], "name": "OwnerChanged", "type": "event" } ];

const address = "0x2146D6Fe8B5039EfFb78Fa4Ac5138dc96eD3D544";

module.exports = {
	ABI,
	address,
};