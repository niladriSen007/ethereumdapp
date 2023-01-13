//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Funder
{
        uint public numberOfFunders;

        mapping(uint=>address) private funders;

         receive() external payable{}

        function transfer()external payable {
            funders[numberOfFunders] = msg.sender;
        }

        function withdraw(uint amount) external {
            require(amount>2000000000000000000,"You can withdraw within the specifier limit");
            payable(msg.sender).transfer(amount);
        }
}