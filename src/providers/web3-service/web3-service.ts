import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import { ObsidianApiServiceProvider } from '../obsidian-api-service/obsidian-api-service';
import { Storage } from '@ionic/storage';

const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";

interface SmartContractInfo {
	abi: string;
	address: string
}

@Injectable()
export class Web3ServiceProvider {
	web3Instance: any;
	smartContractAbi: any;
	smartContractAddress: string;
	address: any;
	constructor(public http: HttpClient,
		public obsidianApiProvider: ObsidianApiServiceProvider,
		public storage: Storage) {
		this.web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));
	}

	get() {
		return this.web3Instance;
	}

	getMyBalance() {
		return new Promise((resolve, reject) => {
			let contract = this.getSmartContractObject();			
			contract.balances(this.address, (error, result) => {
				resolve(result.toNumber());
			})
		});

	}
	setupSmartContractInfo(address) {	
		return new Promise((resolve, reject) => {
			this.address = address;
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

	listenForEquipmentTransferred(callback) {
		let contract = this.getSmartContractObject();
		var myEvent = contract.newEquipmentTransferred({}, 'latest');
		myEvent.watch((error, event) => {
			console.log("A equipment has been transferred");
			if (!error) {
				//this.storage.get('newEquipmentTransferred').then((val) => {
				//	if (val) {
				let equipmentId = event.args.equipmentId.toNumber();
				let recipient = event.args.recipient;
				callback({
					equipmentId, recipient
				});
				//	}
					//this.storage.set('newEquipmentTransferred', 'on');
				//});
			}
		});
	}

	listenForNewPrograms(callback) {
		let contract = this.getSmartContractObject();
		var myEvent = contract.newProgramAdded({}, 'latest');
		myEvent.watch((error, event) => {
			console.log("New program was added");
			if (!error) {
				//this.storage.get('newProgramAdded').then((val) => {
				//	if (val) {
				//		console.log(event.args);
				callback(event.args);
				//	}
				//	this.storage.set('newProgramAdded', 'on');
				//});
			}
		});
	}

	applyForProgram = (programId) => {
		return new Promise((resolve, reject) => {			
			let requester = this.address;
			let obsidianContract = this.getSmartContractObject();
			obsidianContract.requestEquipment(programId, requester, {
				gas: 2000000,
				from: this.address
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