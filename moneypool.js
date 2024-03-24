// // Import Web3.js library
// const Web3 = require('web3');

// // Set up Web3 provider
// const web3 = new Web3(Web3.givenProvider || 'https://localhost:7545');

// // Load the contract ABI (Application Binary Interface)
// const contractABI = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "accountHolder",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "LogDepositMade",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "deposit",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "viewBalance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "withdrawAmount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "withdraw",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ];

// // Specify the deployed contract address
// const contractAddress = '0x123...'; // Replace with your deployed contract address

// // Create contract instance
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // Get the deposit button element
// const depositButton = document.getElementById('depositButton');

// // Add click event listener to the deposit button
// depositButton.addEventListener('click', async () => {
//     // Get user account
//     const accounts = await web3.eth.getAccounts();
//     const userAccount = accounts[0];

//     // Get lock period and amount from user input (example)
//     const lockPeriod = 30; // 30 days
//     const amount = 1; // 1 ether (adjust as needed)

//     // Call the deposit function of the smart contract
//     await contract.methods.deposit(lockPeriod).send({ from: userAccount, value: web3.utils.toWei(amount.toString(), 'ether') });

//     // Handle success or display message to the user
//     alert('Deposit successful!');
// });
var web3;
var address="";

async function  connect(){
	await window.web3.currentProvider.enable();
	web3 = new Web3(window.web3.currentProvider);
}
if(typeof web3 !== 'undefined'){
	web3=new web3(window.web3.currentProvider);
}
else{
	web3=new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}
var abi=[];
var contract=new Web3.eth.contract(abi,address)