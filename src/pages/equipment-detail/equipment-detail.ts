import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
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
    private toastService: ToastServiceProvider,
    private alertCtrl: AlertController) {
    this.equipment = this.navParams.get('equipment');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDetailPage');
  }

  requestEquipment() {
    //debugger;
    //TODO: still need to add logic and get the parameter of the program id
    this.loading();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Your request has been sent',
      buttons: [
        {
          text: 'Ok',       
          handler: () => {
            this.navCtrl.push(HomePage);
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
      console.log('Dismissed loading');
        this.presentAlert();
      	// this.toastService.presentToast("A new program has been released", () =>{
		 		// navCtrl.push(DetailsPage);
			  // });//puedo usar los toasters para los mensajes de exito	
    });

    loading.present();
  }
}
