import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { EquipmentDetailPage } from '../equipment-detail/equipment-detail';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';

@Component({
  selector: 'page-equipments',
  templateUrl: 'equipments.html',
})
export class EquipmentsPage {
  equipments: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private obsidianServiceAPI: ObsidianApiServiceProvider) {
    this.equipments =  this.obsidianServiceAPI.getEquipments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentsPage');
  }

  viewEquipmentDetail(equipment) {
    this.navCtrl.push(EquipmentDetailPage, {equipment: equipment});
  }
}
