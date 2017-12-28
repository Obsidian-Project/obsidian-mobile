import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	web3: any;
	constructor(public navCtrl: NavController, 
		private web3Service: Web3ServiceProvider,
		private toastService: ToastServiceProvider) {
			toastService.presentToast("A new program has been released", () =>{
				navCtrl.push(DetailsPage);
			});//puedo usar los toasters para los mensajes de exito

	}
	viewDetails() {
		this.navCtrl.push(DetailsPage);
		let smartContractInstance = this.web3Service.getSmartContractObject();
		smartContractInstance.members("0x1a711f850FD3757342B1790A9F4c530D3a2834BC", (error, result) => {
			console.log(result);
		});
	}
}
