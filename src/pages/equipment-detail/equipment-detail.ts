import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-equipment-detail',
  templateUrl: 'equipment-detail.html',
})
export class EquipmentDetailPage {
  equipment: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,   
    private alertCtrl: AlertController) {
    this.equipment = this.navParams.get('equipment');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDetailPage');
  }

  requestEquipment() {
    //TODO: still need to add logic and get the parameter of the program id
    //out of scope for demo
    this.loading();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Your request has been sent',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',       
          handler: () => {
            let navTransition = alert.dismiss();
            navTransition.then(() => {              
              this.navCtrl.push(HomePage);
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
      spinner: 'iOS',
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
