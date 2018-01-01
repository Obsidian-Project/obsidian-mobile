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
  peerRequestInfo: any;
  equipment: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private obsidianServiceAPI: ObsidianApiServiceProvider, 
    private web3ServiceProvider: Web3ServiceProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    //peerRequestInfo
    this.peerRequestInfo = this.navParams.get('peerRequestInfo');   
    this.equipment = this.obsidianServiceAPI.getEquipment(this.peerRequestInfo.equipmentId.toNumber())
      .map((item) => {
        return item[0];
      })
    //beneficiary / equipment
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentRequestPage');
  }
  approveRequestOfEquipment(equipmentId){
    let loader = this.getLoaderInstance();
    loader.present();
    this.web3ServiceProvider.requestOfEquipment(equipmentId)
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
