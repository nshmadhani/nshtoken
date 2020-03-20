pragma solidity >=0.4.21 <0.6.0;

contract DappToken {


    string public name = "NASH TOKEN";
    
    string public symbol = "NSH";

    uint256 public totalSupply;


    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _amount
    );
    
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _amount
    );


    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance; // [owner][spender]
    
    constructor(uint256 _initSupply) public {
        balanceOf[msg.sender] = _initSupply;
        totalSupply = _initSupply;
    }

    function transfer(address _to,uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value,"Balance not Available");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    
    function approve(address _spender,uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }




    function transferFrom(address _from,address _to,uint256 _value) public returns(bool success) {
        require(allowance[_from][msg.sender] >= _value,"Is Allowed to Send the Value");
        require(balanceOf[_from] >= _value,"Balance Should be available");
        
        allowance[_from][msg.sender] -= _value;
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        
        emit Transfer(_from,_to,_value);
        return true;
    }
}


