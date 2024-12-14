
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0x93f8dddd876c7dBE3323723500e83E202A7C96CC';  // deployed contract address
const contractABI = [[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "addMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMessages",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    // ABI of the deployed smart contract
    "function addMessage(string memory _message) public",
    "function getMessages() public view returns (string[] memory)"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

document.getElementById('connect-button').addEventListener('click', async () => {
    await provider.send("eth_requestAccounts", []);
    displayMessages();
});

document.getElementById('message-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const tx = await contract.addMessage(message);
    await tx.wait();
    displayMessages();
    document.getElementById('message').value = '';
});

async function displayMessages() {
    const messages = await contract.getMessages();
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';

    messages.forEach(message => {
        const li = document.createElement('li');
        li.textContent = message;
        messageList.appendChild(li);
    });
}
