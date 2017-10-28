pragma solidity ^0.4.18;

/**
 * The Owned contract ensures that only the creator (deployer) of a 
 * contract can perform certain tasks.
 */
contract Owned {
	address public owner = msg.sender;
	event OwnerChanged(address indexed old, address indexed current);
	modifier only_owner { require(msg.sender == owner); _; }
	function setOwner(address _newOwner) only_owner public { OwnerChanged(owner, _newOwner); owner = _newOwner; }
}

/**
 * The BaseContract contract does this and that...
 */
contract BaseContract is Owned {

	mapping (address => mapping (address => bool)) allowance;
	

	function BaseContract () {
		
	}

	function approve(address viewer) returns(bool res) {
		allowance[msg.sender][viewer] = true;
		return true;
	}
	
}


/**
 * The InfoContainer contract does this and that...
 */
contract InfoContainer is BaseContract {

	struct sensorDataEntity {
		string name;
		//String formated as "time1:value1,time2:value2,..."
		string[] values;
	}

	mapping (address => sensorDataEntity[]) values;

	function getData(address from) constant returns(string[]) {
		require(from == owner || allowance[owner][from] == true);
		sensorDataEntity[] myMapping = values[from];
		
	}

	function addData(address to, string name, string data) only_owner {
		sensorDataEntity[] vls = values[to];
		uint len = vls.length;
	}


	function InfoContainer () {
		
	}

}
