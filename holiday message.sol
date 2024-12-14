// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HolidayMessages {
    string[] private messages;  // Array to store holiday messages

    // Function to add a new message
    function addMessage(string memory _message) public {
        messages.push(_message);
    }

    // Function to get all messages
    function getMessages() public view returns (string[] memory) {
        return messages;
    }
}
