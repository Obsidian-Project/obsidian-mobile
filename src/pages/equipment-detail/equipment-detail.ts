import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';

@Component({
  selector: 'page-equipment-detail',
  templateUrl: 'equipment-detail.html',
})
export class EquipmentDetailPage {
  equipment: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,   
    private web3Service: Web3ServiceProvider,
    private alertCtrl: AlertController) {
    this.equipment = this.navParams.get('equipment');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDetailPage');
  }

  requestPeerApproval() {
    let loader = this.getLoaderInstance();
    console.log(this.equipment.equipmentId);
    loader.present();
    this.web3Service.requestPeerApproval(this.equipment.equipmentId)
      .then((result) => {
          loader.dismiss();       
      }).catch((error) => {
        debugger;
      });
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
          cssClass: 'custom-color-alert',          
          handler: () => {
            let navTransition = alert.dismiss();
            navTransition.then(() => {              
              this.navCtrl.setRoot(HomePage);
            });
            return false;
          }
        }
      ]
    });

    alert.present();
  }

  loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Requesting equipment',
      duration: 3000,
      showBackdrop: true,
      cssClass: 'loader',
    });

    loading.onDidDismiss(() => {
        this.presentAlert();      
    });

    loading.present();
  }
}
