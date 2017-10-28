pragma solidity ^0.4.16;

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

	function approve(address viewer) public returns(bool res) {
		allowance[msg.sender][viewer] = true;
		return true;
	}
	
}


/**
 * The InfoContainer contract does this and that...
 */
contract InfoContainer is BaseContract {

	event NewData(address whom, string data);
	

	struct sensorDataEntity {
		string name;
		//String formated as "time1:value1,time2:value2,..."
		string[] values;
	}

	mapping (address => mapping (string => string)) values;

	function getData(address whom, string sensorName) constant public returns(string) {
		require((whom == owner) || (allowance[owner][whom]));
		return values[whom][sensorName];
	}

	function replaceData(address to, string name, string data) public only_owner {
		require(to == owner);
		values[to][name] = data;
		NewData(to, data);
	}


	function InfoContainer () {
		
	}

}
