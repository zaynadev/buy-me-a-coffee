// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract BuyMeACoffee {
    struct Memo {
        address from;
        string name;
        string message;
        uint256 timestamp;
    }

    address payable owner;
    Memo[] memos;

    event NewMemo(
        address indexed from,
        string name,
        string message,
        uint256 timestamp
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "can't buy coffe with 0 eth");
        memos.push(Memo(msg.sender, _name, _message, block.timestamp));
        emit NewMemo(msg.sender, _name, _message, block.timestamp);
    }
}
