import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  balance: any;
  equipments: Observable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private web3Service: Web3ServiceProvider,
    private obsidianServiceAPI: ObsidianApiServiceProvider) {
      web3Service.setupSmartContractInfo()
			.then((info: any) => {
				this.web3Service.getMyBalance().then((result) =>{				
          this.balance = result;
          this.equipments =  this.obsidianServiceAPI.getMyEquipments();
				})
			}).catch((error) => {
				console.log(error);
			});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
