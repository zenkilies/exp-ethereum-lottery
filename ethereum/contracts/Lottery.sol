// SPDX-License-Identifier: MIT

pragma solidity ^0.6.10;

contract Lottery {
    address public manager;
    address payable public winner;
    address payable[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(winner == address(0));
        require(msg.value == .01 ether);

        players.push(msg.sender);
    }

    function pickWinner() public payable {
        require(msg.sender == manager);
        require(players.length > 0);

        uint index = random() % players.length;

        winner = players[index];
        winner.transfer(address(this).balance);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }
}
