import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { LocalNotifications } from '@ionic-native/local-notifications';

//import { EquipmentsPage } from '../equipments/equipments';
//import { ActivityPage } from '../activity/activity';
//import { ProgramsPage } from '../programs/programs';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	web3: any;
	constructor(public navCtrl: NavController, private web3Service: Web3ServiceProvider, private localNotifications: LocalNotifications) {
		// Schedule a single notification
		
		//register listener for event changes in Ethereum
		this.web3Service.listenForNewPrograms((ipfsProgramHash) => {
			this.localNotifications.schedule({
				title: "Obsidian",
				text: 'A new subsidy has been published',
				data: { secret: ipfsProgramHash },
				at: null
			});
		})
	}
	viewDetails() {
		this.navCtrl.push(DetailsPage);
		let smartContractInstance = this.web3Service.getSmartContractObject();
		smartContractInstance.members("0x1a711f850FD3757342B1790A9F4c530D3a2834BC", (error, result) => {
			console.log(result);
		});
	}
}
