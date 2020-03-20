pragma solidity >=0.4.21 <0.6.0;


import './DappToken.sol';

contract DappTokenSale {





        address admin;
        DappToken public tokenContract;
        uint256 public tokenPrice;
        uint256 public tokenSold;

        uint256 public d;

        event Sell(
            address indexed _buyer,
            uint256 _amount
        );

        function multiply(uint x, uint y) internal pure returns (uint z) {
            require(y == 0 || (z = x * y) / y == x);
        }

        constructor(DappToken _contract,uint256 _tokenPrice) public {
            admin = msg.sender;
            tokenContract = _contract;
            tokenPrice = _tokenPrice;
            tokenSold = 0;
            d = tokenContract.balanceOf(address(this));

        }


        function buy(uint256 _numberOfTokens) public payable {
            require(msg.value == multiply(_numberOfTokens, tokenPrice),"MNo");
            require(tokenContract.balanceOf(address(admin)) >= _numberOfTokens,"No Tokens Left");
            require(tokenContract.transferFrom(admin,msg.sender, _numberOfTokens),"Cannot Transfer");


            tokenSold += _numberOfTokens;

            emit Sell(msg.sender, _numberOfTokens);
        }

        function bal() public returns (uint256 b){
            return tokenContract.balanceOf(address(this));
        }


        function allowance() public returns(uint256 a) {
            return tokenContract.allowance(admin,address(this));
        }


}   


