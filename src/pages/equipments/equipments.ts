import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { EquipmentDetailPage } from '../equipment-detail/equipment-detail';

@Component({
  selector: 'page-equipments',
  templateUrl: 'equipments.html',
})
export class EquipmentsPage {
  equipments: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.equipments = this.httpClient.get('http://localhost:3000/equipments/tractors');
    //TODO: move the url to a file or something
    // this.equipments
    // .subscribe(data => {
    //   console.log('my data: ', data);
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentsPage');
  }

  viewEquipmentDetail(equipment) {
    this.navCtrl.push(EquipmentDetailPage, {equipment: equipment});
  }
}
