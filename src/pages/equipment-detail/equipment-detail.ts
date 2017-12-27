import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-equipment-detail',
  templateUrl: 'equipment-detail.html',
})
export class EquipmentDetailPage {
  equipment: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.equipment = this.navParams.get('equipment');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDetailPage');
  }

}
