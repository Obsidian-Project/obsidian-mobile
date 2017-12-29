import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
//import { Storage } from '@ionic/storage';
import { ObsidianApiServiceProvider } from '../obsidian-api-service/obsidian-api-service';

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

	constructor(public http: HttpClient,
		//private storage: Storage,
		private obsidianApiProvider: ObsidianApiServiceProvider,
	) {
		this.web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));
		console.log("running service");
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
}