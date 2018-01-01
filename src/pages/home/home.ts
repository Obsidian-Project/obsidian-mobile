import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
import { ProgramDetailPage } from '../program-detail/program-detail';
import { Events } from 'ionic-angular';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	web3: any;
	balance: any;
	imageUrl: string;
	name: string;
	address: string;
	constructor(public navCtrl: NavController,
		private localNotifications: LocalNotifications,
		public events: Events,
		private web3Service: Web3ServiceProvider,
		private obsidianApiProvider: ObsidianApiServiceProvider,
		private storage: Storage
	) {
		obsidianApiProvider.getAccountInfo().then((accountInfo: any) => {
			this.storage.clear().then(() => {			
				this.storage.set('address', accountInfo.account);
				this.storage.set('profileImageUrl', accountInfo.profileImageUrl);
				this.storage.set('name', accountInfo.name);
				this.name = accountInfo.name;
				this.address = accountInfo.address;
				this.imageUrl = accountInfo.profileImageUrl;
				web3Service.setupSmartContractInfo(accountInfo.account)
					.then((info: any) => {						
						this.web3Service.getMyBalance().then((result) => {
							this.balance = result;
						})
						this.setupListeners();
					}).catch((error) => {
						console.log(error);
					});
			});

		});		
	}
	setupListeners() {
		this.listenForNewPrograms();
		this.listenForEquipmentTransferred();
		this.listenForPeerRequests();
		this.setupNotificationActions();
	}
	ionViewDidLoad() {
		console.log('HomePage');
	}

	listenForPeerRequests() {
		this.web3Service.listenForPeerRequests((peerRequestInfo) => {
			debugger;
			if(peerRequestInfo.account !== this.address){
				this.localNotifications.schedule({
					title: "Obsidian",
					text: 'A member of your group has requested a new equipment',
					data: { transferInfo: peerRequestInfo, type: "newPeerRequest" },
					at: null
				});
			}
		})
	}

	listenForEquipmentTransferred() {
		this.web3Service.listenForEquipmentTransferred((transferInfo) => {
			this.events.publish('equipmentTransferred');
			this.localNotifications.schedule({
				title: "Obsidian",
				text: 'You have received a new equipment',
				data: { transferInfo: transferInfo, type: "newTransfer" },
				at: null
			});

			this.web3Service.getMyBalance().then((result) => {
				this.balance = result;
			})
		})
	}
	listenForNewPrograms() {
		this.web3Service.listenForNewPrograms((programInfo) => {
			this.events.publish('programCreated');
			this.localNotifications.schedule({
				title: "Obsidian",
				text: 'A new subsidy has been published',
				data: { programInfo: programInfo, type: "newProgram" },
				at: null
			});
		})
	}

	setupNotificationActions(): any {
		this.localNotifications.on('click', (notification, state) => {
			let json = JSON.parse(notification.data);
			switch (json.type) {
				case "newProgram":
					this.navCtrl.push(ProgramDetailPage, { program: { ipfsHash: json.programInfo.ipfsHash, programId: json.programInfo.programId } });
				case "newTransfer":
					let { recipient, equipmentId } = json.transferInfo;
					this.navCtrl.push(DetailsPage, { transferInfo: { recipient, equipmentId } });
			}
		});
	}
	viewDetails() {
		this.navCtrl.push(DetailsPage);
	}
}
