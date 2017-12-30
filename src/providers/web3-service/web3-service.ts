import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import { ObsidianApiServiceProvider } from '../obsidian-api-service/obsidian-api-service';

const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";
const DEMO_ADDRESS = "0xf3ad20433639493ceab8a85fa838c73d65b84b6f";

interface SmartContractInfo {
	abi: string;
	address: string
}

@Injectable()
export class Web3ServiceProvider {
	web3Instance: any;
	smartContractAbi: any;
	smartContractAddress: string;

	constructor(public http: HttpClient,	
		private obsidianApiProvider: ObsidianApiServiceProvider) {
		this.web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));	
	}

	get() {
		return this.web3Instance;
	}

	setupSmartContractInfo() {
		return new Promise((resolve, reject) => {
			this.obsidianApiProvider.getSmartContractInfo()
				.then((info: SmartContractInfo) => {
					this.smartContractAbi = info.abi;
					this.smartContractAddress = info.address;
					resolve(info);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});

	}

	getSmartContractObject() {
		let contractABI = this.web3Instance.eth.contract(this.smartContractAbi);
		let contractObj = contractABI.at(this.smartContractAddress);
		return contractObj;
	}

	listenForNewMemberAdded(callback) {
		let contract = this.getSmartContractObject();
		var myEvent = contract.newMemberAdded({}, { fromBlock: 0, toBlock: 'latest' });
		myEvent.watch(function (error, event) {
			console.log("New member was added");
			if (!error) {
				console.log(event.args);
				callback(event.args);
			}
		});
	}

	listenForNewPrograms(callback) {

		let contract = this.getSmartContractObject();
		var myEvent = contract.newProgramAdded({}, { fromBlock: 0, toBlock: 'latest' });
		myEvent.watch(function (error, event) {
			console.log("New program was added");
			if (!error) {
				console.log(event.args);
				callback(event.args);
			}
		});
	}

	applyForProgram = (programId) => {		
		return new Promise((resolve, reject) => {				
			let address = DEMO_ADDRESS;
			let requester = address;
			let obsidianContract = this.getSmartContractObject();
			obsidianContract.requestEquipment(programId, requester, {
				gas: 2000000,
				from: address
			}, (error, txHash) => {
				if (error) { 					
					throw error 
				}
				this.waitForMined(txHash, { blockNumber: null },
					function pendingCB() {
						// Signal to the user you're still waiting
						// for a block confirmation						
					},
					function successCB(data) {
						resolve();//don't need to pass nothing
					}
				)
			})
		})
	}	

	waitForMined = (txHash, response, pendingCB, successCB) => {
		if (response.blockNumber) {
			successCB();
		} else {
			pendingCB()
			this.pollingLoop(txHash, response, pendingCB, successCB)
		}
	}
	
	pollingLoop = (txHash, response, pendingCB, successCB) => {
		setTimeout(() => {
			this.web3Instance.eth.getTransaction(txHash, (error, response) => {
				if (error) { throw error }
				if (response === null) {
					response = { blockNumber: null }
				}
				this.waitForMined(txHash, response, pendingCB, successCB)
			})
		}, 1000);
	}
}