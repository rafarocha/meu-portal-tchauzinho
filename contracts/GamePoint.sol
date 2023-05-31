// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GamePoint {
    mapping (address => uint) public balances;

    constructor() {
        console.log("Welcome GamePoint!");
    }

    function point(address wallet) public {
        uint256 value = balances[wallet];
        balances[wallet] = value + 1;
    }

    function foo() public view {
        console.log("bar");
    }

    function getBalance(address wallet) public view returns (uint256) {
        return balances[wallet];
    }

    function getMaxBalanceAddress() public view returns (address) {
        uint256 maxBalance = 0;
        address maxBalanceAddress;

        for (uint256 i = 0; i < 2**160; i++) {
            address contractAddress = address(this);
            uint160 contractAddressUInt = uint160(contractAddress);
            uint256 added = i + contractAddressUInt;
            address possibleAddress = address(uint160(added) << 96);
            uint256 possibleBalance = balances[possibleAddress];

            if (possibleBalance > maxBalance) {
                maxBalance = possibleBalance;
                maxBalanceAddress = possibleAddress;
            }
        }
        return maxBalanceAddress;
    }

    function getRandom(uint size) public view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % size;
    }

    function wave(string memory _message) public {
    }


}