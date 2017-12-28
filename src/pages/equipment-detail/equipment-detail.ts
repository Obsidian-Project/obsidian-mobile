import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-equipment-detail',
  templateUrl: 'equipment-detail.html',
})
export class EquipmentDetailPage {
  equipment: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
      this.equipment = this.navParams.get('equipment');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDetailPage');
  }

  requestEquipment(){
     //debugger;
    //TODO: still need to add logic and get the parameter of the program id
    this.loading()
  }
  
  loading() {
  let loading = this.loadingCtrl.create({
    spinner: 'crescent',
    content: 'Requesting equipment',
    duration: 3000,
    showBackdrop: true,
    cssClass:'loader',
  });

  loading.present();
  }
}
