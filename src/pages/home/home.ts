import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import Web3 from 'web3';

const OBSIDIAN_CONTRACT_ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfMembers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfGroups",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "membersInfo",
		"outputs": [
			{
				"name": "latitude",
				"type": "string"
			},
			{
				"name": "longitude",
				"type": "string"
			},
			{
				"name": "sizeOfLand",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "members",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "element",
				"type": "uint256"
			}
		],
		"name": "getGroupInfo",
		"outputs": [
			{
				"components": [
					{
						"name": "members",
						"type": "address[]"
					}
				],
				"name": "groupInformation",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newMember",
				"type": "address"
			},
			{
				"name": "latitude",
				"type": "string"
			},
			{
				"name": "longitude",
				"type": "string"
			},
			{
				"name": "sizeOfLand",
				"type": "uint256"
			}
		],
		"name": "addMember",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGroupMembers",
				"type": "address[]"
			}
		],
		"name": "registerGroup",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

const OBSIDIAN_CONTRACT_ADDRESS = "0x19c216cb0e37b157e8531c2c4f402b2f4aa5de2b";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  web3: any;
  constructor(public navCtrl: NavController) {

  }

  test(){
    debugger;
    // let web3 = new Web3(web3.currentProvider || undefined);
    // let contractABI = web3.eth.contract(OBSIDIAN_CONTRACT_ABI);
    // let contractObj = contractABI.at(OBSIDIAN_CONTRACT_ADDRESS);      
    // contractObj.members("0x1a711f850FD3757342B1790A9F4c530D3a2834BC", (error, result) => {
    //   console.log(result);
    // });
  }
}
