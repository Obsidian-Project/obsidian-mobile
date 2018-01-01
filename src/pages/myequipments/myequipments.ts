import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
//import { IventoryDetailPage } from '../iventory-detail/iventory-detail';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'myequipments',
  templateUrl: 'myequipments.html',
})
export class MyEquipmentsPage {
  equipments: Observable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private obsidianServiceAPI: ObsidianApiServiceProvider,
    public events: Events) {
    this.equipments =  this.obsidianServiceAPI.getMyEquipments();
    events.subscribe('equipmentTransferred', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.equipments =  this.obsidianServiceAPI.getMyEquipments();
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEquipmentsPage');
  }

  viewIventoryDetail(){
    //this.navCtrl.push(IventoryDetailPage);
    // console.log("hello");
  }
}
