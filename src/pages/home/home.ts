import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	web3: any;
	constructor(public navCtrl: NavController, 
		private web3Service: Web3ServiceProvider, 
		private localNotifications: LocalNotifications,
		private toastService: ToastServiceProvider,
		private obsidianApiProvider: ObsidianApiServiceProvider) {
		// 	toastService.presentToast("A new program has been released", () =>{
		// 		navCtrl.push(DetailsPage);
		// 	});//puedo usar los toasters para los mensajes de exito
		
		obsidianApiProvider.getSmartContractInfo();//clean local storage, y setear con las nuevas variables?
		// //register listener for event changes in Ethereum
		this.web3Service.listenForNewPrograms((ipfsProgramHash) => {
			this.localNotifications.schedule({
				title: "Obsidian",
				text: 'A new subsidy has been published',
				data: { secret: ipfsProgramHash },
				at: null
			});
		})

		//let contract = web3Service.getSmartContractObject();
		
		// let events = contract.allEvents();
		// events.watch((error, event) => {
		// 	console.log("something happened");
		// 	if(!error){
		// 		console.log(event);				
		// 	}
		// });
		
	}
	viewDetails() {
		this.navCtrl.push(DetailsPage);
		let smartContractInstance = this.web3Service.getSmartContractObject();
		smartContractInstance.members("0x1a711f850FD3757342B1790A9F4c530D3a2834BC", (error, result) => {
			console.log(result);
		});
		// let contract = this.web3Service.getSmartContractObject();
		// let events = contract.allEvents();
		// events.watch((error, event) => {
		// 	console.log("something happened");
		// 	if(!error){
		// 		console.log(event);				
		// 	}
		// });
	}
}
