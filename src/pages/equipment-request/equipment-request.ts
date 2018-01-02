import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';

@Component({
  selector: 'page-equipment-request',
  templateUrl: 'equipment-request.html',
})
export class EquipmentRequestPage {
  equipmentId: any;
  equipment: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private obsidianServiceAPI: ObsidianApiServiceProvider, 
    private web3ServiceProvider: Web3ServiceProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    //peerRequestInfo
    this.equipmentId = this.navParams.get('equipmentId');   
    debugger;
    this.equipment = this.obsidianServiceAPI.getEquipment(this.equipmentId)
      .map((item) => {
        return item[0];
      })
    //beneficiary / equipment
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentRequestPage');
  }
  approveRequestOfEquipment(){
    let loader = this.getLoaderInstance();
    loader.present();
    this.web3ServiceProvider.requestOfEquipment(this.equipmentId)
      .then((result) => {
        loader.dismiss();       
      })
  }

  getLoaderInstance() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Requesting equipment',
      duration: 3000,
      showBackdrop: true,
      cssClass: 'loader',
    });
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
      this.presentAlert();
    });
    return loading;
  }

  presentAlert() {//TODO: move to a service, duplication of code
    let alert = this.alertCtrl.create({
      subTitle: 'Your request has been sent',
      enableBackdropDismiss: false,     
      buttons: [
        {
          text: 'Ok',         
          handler: () => {
            let navTransition = alert.dismiss();
            navTransition.then(() => {
              this.navCtrl.pop();
            });
            return false;
          }
        }
      ]
    });

    alert.present();
  }

}
