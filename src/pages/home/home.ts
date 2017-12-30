import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
import { ProgramDetailPage } from '../program-detail/program-detail';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	web3: any;
	balance: any;
	constructor(public navCtrl: NavController,
		private web3Service: Web3ServiceProvider,
		private localNotifications: LocalNotifications		
		) {				
		web3Service.setupSmartContractInfo()
			.then((info: any) => {
				this.web3Service.getMyBalance().then((result) =>{				
					this.balance = result;
				})
				this.setupListeners();
			}).catch((error) => {
				console.log(error);
			});
	}
	setupListeners() {
		this.listenForNewPrograms();
		this.listenForNewMemberAdded();
		this.setupNotificationActions();
	}

	listenForNewPrograms() {
		this.web3Service.listenForNewPrograms((programInfo) => {
			this.localNotifications.schedule({
				title: "Obsidian",				
				text: 'A new subsidy has been published',
				data: { programInfo: programInfo, type: "newProgram" },
				at: null
			});
		})
	}

	listenForNewMemberAdded() {
		this.web3Service.listenForNewMemberAdded((memberInfo) => {
			this.localNotifications.schedule({
				title: "Obsidian",
				text: 'A new member has been registered',
				data: { memberInfo: memberInfo, type: "newMember" },
				at: null
			});
		})
	}

	setupNotificationActions(): any {
		this.localNotifications.on('click', (notification, state) => {
			let json = JSON.parse(notification.data);
			switch(json.type){
				case "newProgram":
					let { ipfsHash, programId } = json;
					this.navCtrl.push(ProgramDetailPage, { program: { ipfsHash, programId } });
				case "newMember":
					this.navCtrl.push(DetailsPage);
				default:
					//nothing to do?
			}
		});
	}
	viewDetails() {
		this.navCtrl.push(DetailsPage);
		let smartContractInstance = this.web3Service.getSmartContractObject();
		smartContractInstance.members("0x1a711f850FD3757342B1790A9F4c530D3a2834BC", (error, result) => {
			console.log(result);
		});
	}
}
